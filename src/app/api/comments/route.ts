import { NextRequest, NextResponse } from 'next/server';
import { CommentSchema } from '@/lib/validations';
import { executeQuery } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = CommentSchema.parse(body);
    
    // Save comment to database with 'pending' status
    const result = await executeQuery(
      `INSERT INTO comments (
        post_id, parent_id, author_name, author_email, 
        author_website, content, status
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [
        validatedData.postId,
        validatedData.parentId || null,
        validatedData.authorName,
        validatedData.authorEmail,
        validatedData.authorWebsite || null,
        validatedData.content
      ]
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your comment! It will be reviewed before being published.',
        commentId: (result as any).insertId 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Comment submission error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your comment data and try again.',
          errors: (error as any).errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sorry, something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = parseInt(searchParams.get('post_id') || '0');
    const status = searchParams.get('status') || 'approved';
    
    if (!postId) {
      return NextResponse.json(
        { success: false, message: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get approved comments for the post
    const comments = await executeQuery(
      `SELECT id, post_id, parent_id, author_name, author_website, 
              content, created_at
       FROM comments 
       WHERE post_id = ? AND status = ?
       ORDER BY created_at ASC`,
      [postId, status]
    );

    // Organize comments into a tree structure (replies)
    const commentsMap = new Map();
    const rootComments: any[] = [];

    (comments as any[]).forEach(comment => {
      comment.replies = [];
      commentsMap.set(comment.id, comment);
      
      if (comment.parent_id) {
        const parent = commentsMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return NextResponse.json({
      success: true,
      comments: rootComments,
      totalCount: (comments as any[]).length
    });
    
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve comments' },
      { status: 500 }
    );
  }
}