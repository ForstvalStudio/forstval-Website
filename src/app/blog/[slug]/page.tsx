'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, MessageCircle } from 'lucide-react'
import type { BlogPost } from '@/lib/wordpress'

interface Comment {
  id: number;
  post_id: number;
  parent_id?: number;
  author_name: string;
  author_website?: string;
  content: string;
  created_at: string;
  replies: Comment[];
}

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    author_website: '',
    content: '',
    parent_id: null as number | null
  })
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    fetchBlogPost()
  }, [params.slug])

  const fetchBlogPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog/${params.slug}?include_related=true`)
      const data = await response.json()
      
      if (data.success) {
        setPost(data.post)
        setRelatedPosts(data.relatedPosts || [])
        // Fetch comments
        fetchComments(data.post.id)
      } else {
        setError(data.message || 'Blog post not found')
      }
    } catch (err) {
      setError('Failed to load blog post')
      console.error('Blog post fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async (postId: number) => {
    try {
      const response = await fetch(`/api/comments?post_id=${postId}`)
      const data = await response.json()
      
      if (data.success) {
        setComments(data.comments || [])
      }
    } catch (err) {
      console.error('Comments fetch error:', err)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    setSubmittingComment(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          parentId: commentForm.parent_id,
          authorName: commentForm.author_name,
          authorEmail: commentForm.author_email,
          authorWebsite: commentForm.author_website,
          content: commentForm.content
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setCommentForm({
          author_name: '',
          author_email: '',
          author_website: '',
          content: '',
          parent_id: null
        })
        // Show success message
        alert('Thank you for your comment! It will be reviewed before being published.')
      } else {
        alert(data.message || 'Failed to submit comment')
      }
    } catch (err) {
      alert('Failed to submit comment')
      console.error('Comment submit error:', err)
    } finally {
      setSubmittingComment(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt.replace(/<[^>]*>/g, ''),
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
          <Link 
            href="/blog"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="container-custom relative max-w-4xl" ref={ref}>
        {/* Back Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/blog"
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </div>
          </div>

          {post.categories.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              {post.categories.map(category => (
                <span 
                  key={category.id}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={sharePost}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:scale-105 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
        </motion.header>

        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div 
            className="mb-12 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article 
          className="prose prose-lg prose-invert max-w-none mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag.id}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comments Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="glass p-6 rounded-2xl mb-8">
            <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={commentForm.author_name}
                onChange={(e) => setCommentForm(prev => ({ ...prev, author_name: e.target.value }))}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={commentForm.author_email}
                onChange={(e) => setCommentForm(prev => ({ ...prev, author_email: e.target.value }))}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <input
              type="url"
              placeholder="Your Website (optional)"
              value={commentForm.author_website}
              onChange={(e) => setCommentForm(prev => ({ ...prev, author_website: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary mb-4"
            />
            
            <textarea
              placeholder="Your comment *"
              rows={4}
              value={commentForm.content}
              onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary mb-4 resize-none"
              required
            />
            
            <button
              type="submit"
              disabled={submittingComment}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {submittingComment ? 'Submitting...' : 'Post Comment'}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.author_name[0].toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-semibold">
                      {comment.author_website ? (
                        <a href={comment.author_website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {comment.author_name}
                        </a>
                      ) : (
                        comment.author_name
                      )}
                    </h5>
                    <span className="text-sm text-gray-400">{formatDate(comment.created_at)}</span>
                  </div>
                </div>
                <p className="text-gray-300">{comment.content}</p>
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {reply.author_name[0].toUpperCase()}
                          </div>
                          <div>
                            <h6 className="font-semibold text-sm">{reply.author_name}</h6>
                            <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage.url}
                        alt={relatedPost.featuredImage.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {formatDate(relatedPost.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}