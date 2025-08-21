import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '10');
    const category = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('search') || undefined;
    const type = searchParams.get('type'); // 'categories' or 'tags'

    // Handle different request types
    if (type === 'categories') {
      const categories = await getBlogCategories();
      return NextResponse.json({ success: true, categories });
    }

    if (type === 'tags') {
      const tags = await getBlogTags();
      return NextResponse.json({ success: true, tags });
    }

    // Default: get posts
    const result = await getBlogPosts({
      page,
      perPage,
      category,
      tag,
      search,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch blog data',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}