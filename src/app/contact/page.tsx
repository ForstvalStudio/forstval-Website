'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SERVICES, PROJECT_TYPES, BUDGET_RANGES } from '@/lib/constants'
import { Send, Check, AlertCircle, Mail, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceType: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    message: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required'
    if (!formData.projectType) newErrors.projectType = 'Project type is required'
    if (!formData.budgetRange) newErrors.budgetRange = 'Budget range is required'
    if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    if (!formData.message.trim()) newErrors.message = 'Project description is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Please provide more details (minimum 10 characters)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus('success')
        // Reset form after success
        setTimeout(() => {
          setFormData({ 
            name: '', email: '', company: '', phone: '', 
            serviceType: '', projectType: '', budgetRange: '', 
            timeline: '', message: '' 
          })
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
        console.error('Form submission error:', result.message)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
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
            Get In{" "}
            <motion.span 
              className="text-gradient inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Touch
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to start your next project? Let's discuss how we can bring 
            your tech dreams to life.
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing</h2>
              <p className="text-gray-300 mb-8">
                Whether you need AI/ML solutions, web development, game creation, 
                or enterprise software, we're here to help transform your ideas 
                into reality.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Business Inquiries", email: "business@forststalstudio.com", color: "text-blue-400" },
                  { icon: MessageCircle, title: "Technical Support", email: "support@forststalstudio.com", color: "text-green-400" },
                  { icon: Phone, title: "Partnerships", email: "partners@forststalstudio.com", color: "text-purple-400" }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center group cursor-pointer p-4 rounded-lg hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 1.0 + index * 0.1 }
                    } : {}}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div
                      className="mr-4"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <contact.icon className={`w-6 h-6 ${contact.color}`} />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{contact.title}</h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{contact.email}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="glass rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Start Your Project
              </motion.h3>
              
              <motion.form 
                ref={formRef}
                className="space-y-6"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <motion.input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                      required
                    />
                    {errors.name && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <motion.input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                      required
                    />
                    {errors.email && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email}
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.65 }}
                  >
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <motion.input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                      placeholder="Your company name"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.67 }}
                  >
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <motion.input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                      placeholder="Your phone number"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.7 }}
                  >
                    <label className="block text-sm font-medium mb-2">Service Type *</label>
                    <motion.select
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 ${
                        errors.serviceType 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="web-development">Web Development</option>
                      <option value="game-development">Game Development</option>
                      <option value="enterprise-solutions">Enterprise Solutions</option>
                      <option value="custom-software">Custom Software</option>
                      <option value="consulting">Consulting</option>
                    </motion.select>
                    {errors.serviceType && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.serviceType}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.75 }}
                  >
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
                    <motion.select
                      value={formData.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 ${
                        errors.projectType 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                      required
                    >
                      <option value="">Select project type</option>
                      <option value="new-project">New Project</option>
                      <option value="enhancement">Enhancement</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="consulting">Consulting</option>
                      <option value="emergency-support">Emergency Support</option>
                    </motion.select>
                    {errors.projectType && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.projectType}
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    <label className="block text-sm font-medium mb-2">Budget Range *</label>
                    <motion.select
                      value={formData.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 ${
                        errors.budgetRange 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                      <option value="discuss">Let's Discuss</option>
                    </motion.select>
                    {errors.budgetRange && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.budgetRange}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.85 }}
                  >
                    <label className="block text-sm font-medium mb-2">Timeline *</label>
                    <motion.select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 ${
                        errors.timeline 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                      whileFocus={{ scale: 1.02 }}
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">1 Month</option>
                      <option value="3-months">3 Months</option>
                      <option value="6-months">6 Months</option>
                      <option value="1-year">1 Year</option>
                      <option value="flexible">Flexible</option>
                    </motion.select>
                    {errors.timeline && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs mt-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.timeline}
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.9 }}
                >
                  <label className="block text-sm font-medium mb-2">Project Description *</label>
                  <motion.textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                        : 'border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                    placeholder="Tell us about your project, goals, and any specific requirements... (minimum 10 characters)"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message && (
                      <motion.div 
                        className="flex items-center text-red-400 text-xs"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.message}
                      </motion.div>
                    )}
                    <span className={`text-xs ${
                      formData.message.length < 10 ? 'text-red-400' : 
                      formData.message.length > 1900 ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {formData.message.length}/2000
                    </span>
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    submitStatus === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : submitStatus === 'error'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg'
                  } text-white`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 2.0 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                      Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Start Your Project
                    </>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}