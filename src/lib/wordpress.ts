export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  categories: number[];
  tags: number[];
  _embedded?: {
    author: Array<{
      id: number;
      name: string;
      slug: string;
      avatar_urls: Record<string, string>;
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
        sizes: Record<string, {
          source_url: string;
          width: number;
          height: number;
        }>;
      };
    }>;
    'wp:term': Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    slug: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  readingTime: number;
}

const WP_API_BASE = process.env.WORDPRESS_API_URL || 'https://your-domain.com/wp-json/wp/v2';

async function fetchFromWordPress(endpoint: string, params?: Record<string, string>) {
  const url = new URL(endpoint, WP_API_BASE);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // Add embedded data to get author and featured media info
  url.searchParams.append('_embed', '1');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': process.env.WORDPRESS_AUTH_TOKEN ? 
          `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}` : '',
      },
      next: { 
        revalidate: 300 // Cache for 5 minutes
      }
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WordPress API fetch error:', error);
    throw error;
  }
}

function transformWordPressPost(wpPost: WordPressPost): BlogPost {
  const content = wpPost.content.rendered;
  const wordCount = content.replace(/<[^>]*>/g, '').split(' ').length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Average 200 words per minute

  return {
    id: wpPost.id,
    title: wpPost.title.rendered,
    slug: wpPost.slug,
    content: wpPost.content.rendered,
    excerpt: wpPost.excerpt.rendered,
    author: {
      name: wpPost._embedded?.author?.[0]?.name || 'Unknown',
      slug: wpPost._embedded?.author?.[0]?.slug || 'unknown',
      avatar: wpPost._embedded?.author?.[0]?.avatar_urls?.['96'] || '/default-avatar.png',
    },
    publishedAt: wpPost.date,
    updatedAt: wpPost.modified,
    featuredImage: wpPost._embedded?.['wp:featuredmedia']?.[0] ? {
      url: wpPost._embedded['wp:featuredmedia'][0].source_url,
      alt: wpPost._embedded['wp:featuredmedia'][0].alt_text || wpPost.title.rendered,
      width: wpPost._embedded['wp:featuredmedia'][0].media_details.width,
      height: wpPost._embedded['wp:featuredmedia'][0].media_details.height,
    } : undefined,
    categories: wpPost._embedded?.['wp:term']?.[0]?.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })) || [],
    tags: wpPost._embedded?.['wp:term']?.[1]?.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })) || [],
    readingTime,
  };
}

export async function getBlogPosts(options: {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  search?: string;
} = {}): Promise<{ posts: BlogPost[], totalPages: number, total: number }> {
  const params: Record<string, string> = {
    status: 'publish',
    page: String(options.page || 1),
    per_page: String(options.perPage || 10),
  };

  if (options.category) {
    // Get category ID first
    const categories = await fetchFromWordPress('/categories', { slug: options.category });
    if (categories.length > 0) {
      params.categories = String(categories[0].id);
    }
  }

  if (options.tag) {
    // Get tag ID first
    const tags = await fetchFromWordPress('/tags', { slug: options.tag });
    if (tags.length > 0) {
      params.tags = String(tags[0].id);
    }
  }

  if (options.search) {
    params.search = options.search;
  }

  const response = await fetch(
    `${WP_API_BASE}/posts?${new URLSearchParams(params)}`,
    {
      headers: {
        'Authorization': process.env.WORDPRESS_AUTH_TOKEN ? 
          `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}` : '',
      },
      next: { revalidate: 300 }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts: WordPressPost[] = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
  const total = parseInt(response.headers.get('X-WP-Total') || '0');

  return {
    posts: posts.map(transformWordPressPost),
    totalPages,
    total,
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await fetchFromWordPress('/posts', { slug, status: 'publish' });
    
    if (!posts || posts.length === 0) {
      return null;
    }

    return transformWordPressPost(posts[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogCategories(): Promise<WordPressCategory[]> {
  try {
    const categories = await fetchFromWordPress('/categories', { 
      hide_empty: 'true',
      per_page: '100' 
    });
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getBlogTags(): Promise<WordPressTag[]> {
  try {
    const tags = await fetchFromWordPress('/tags', { 
      hide_empty: 'true',
      per_page: '100' 
    });
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getRelatedPosts(postId: number, limit: number = 3): Promise<BlogPost[]> {
  try {
    // Get the current post to find its categories
    const currentPost = await fetchFromWordPress(`/posts/${postId}`);
    if (!currentPost || !currentPost.categories?.length) {
      return [];
    }

    // Get posts from the same categories, excluding the current post
    const relatedPosts = await fetchFromWordPress('/posts', {
      categories: currentPost.categories.join(','),
      exclude: String(postId),
      per_page: String(limit),
      status: 'publish'
    });

    return relatedPosts.map(transformWordPressPost);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}