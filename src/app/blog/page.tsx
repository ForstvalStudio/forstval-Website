'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import type { BlogPost } from '@/lib/wordpress'

interface BlogPageData {
  posts: BlogPost[];
  totalPages: number;
  total: number;
  categories: Array<{ id: number; name: string; slug: string; count: number }>;
}

export default function BlogPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [blogData, setBlogData] = useState<BlogPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchBlogData()
  }, [currentPage, selectedCategory, searchTerm])

  const fetchBlogData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '9'
      })
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      // Fetch posts and categories
      const [postsResponse, categoriesResponse] = await Promise.all([
        fetch(`/api/blog?${params}`),
        selectedCategory === 'all' ? fetch('/api/blog?type=categories') : Promise.resolve(null)
      ])
      
      const postsData = await postsResponse.json()
      const categoriesData = categoriesResponse ? await categoriesResponse.json() : null
      
      if (postsData.success) {
        setBlogData({
          posts: postsData.posts || [],
          totalPages: postsData.totalPages || 1,
          total: postsData.total || 0,
          categories: categoriesData?.categories || []
        })
      } else {
        setError(postsData.message || 'Failed to load blog posts')
      }
    } catch (err) {
      setError('Failed to connect to blog service. Please check if WordPress is configured.')
      console.error('Blog fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchBlogData()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="container-custom relative" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-gradient">Blog</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stay updated with the latest tech insights, project updates, and 
            industry trends from our team.
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blog posts..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </form>

          {/* Categories */}
          {blogData?.categories && (
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                className={`px-6 py-2 rounded-full transition-all hover:scale-105 ${
                  selectedCategory === 'all' 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                    : 'glass'
                }`}
              >
                All Posts
              </button>
              {blogData.categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => { setSelectedCategory(category.slug); setCurrentPage(1); }}
                  className={`px-6 py-2 rounded-full transition-all hover:scale-105 ${
                    selectedCategory === category.slug 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : 'glass'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <motion.div
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-400">Loading blog posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold mb-2 text-red-400">Unable to Load Blog</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => fetchBlogData()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* No Posts State */}
        {blogData?.posts.length === 0 && !loading && !error && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">No Posts Found</h3>
            <p className="text-gray-400">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'We\'re preparing engaging content about technology, tutorials, and project insights.'}
            </p>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {blogData?.posts && blogData.posts.length > 0 && (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {blogData.posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <div 
                      className="text-gray-300 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-400">{post.author.name}</span>
                      </div>
                      
                      {post.categories.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                          {post.categories[0].name}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* Pagination */}
            {blogData.totalPages > 1 && (
              <motion.div 
                className="flex justify-center items-center gap-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <span className="text-gray-400">
                  Page {currentPage} of {blogData.totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(blogData.totalPages, prev + 1))}
                  disabled={currentPage === blogData.totalPages}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}