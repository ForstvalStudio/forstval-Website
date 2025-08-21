import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost, getRelatedPosts } from '@/lib/wordpress';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const includeRelated = searchParams.get('include_related') === 'true';

    // Get the blog post
    const post = await getBlogPost(slug);

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Optionally get related posts
    let relatedPosts = [];
    if (includeRelated) {
      relatedPosts = await getRelatedPosts(post.id, 3);
    }

    return NextResponse.json({
      success: true,
      post,
      ...(includeRelated && { relatedPosts }),
    });

  } catch (error) {
    console.error('Blog post API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch blog post',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}