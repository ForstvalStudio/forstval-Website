export const SITE_CONFIG = {
  name: 'ForstvalStudio',
  title: 'ForstvalStudio - Where Every Tech Dream Finds Its Home',
  description: 'Tech-inclusive development studio specializing in AI/ML, web development, game development, and enterprise solutions. From training cutting-edge LLMs to crafting immersive games.',
  url: 'https://forststalstudio.com',
  ogImage: '/og-image.png',
  creator: '@forststalstudio',
} as const

export const SERVICES = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: '🤖',
    color: 'from-amber-500 to-orange-600',
    description: 'LLM training, computer vision, NLP solutions',
    features: ['GPT Fine-tuning', 'Image Recognition', 'Chatbot Development', 'Neural Networks'],
    projects: ['GPT Fine-tuning', 'Image Recognition', 'Chatbots']
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-600',
    description: 'Modern websites, e-commerce, web apps',
    features: ['Next.js Applications', 'E-commerce Platforms', 'Progressive Web Apps', 'API Development'],
    projects: ['E-commerce Platforms', 'SaaS Applications', 'Portfolios']
  },
  {
    id: 'game',
    title: 'Game Development',
    icon: '🎮',
    color: 'from-red-500 to-pink-600',
    description: 'Mobile games, web games, AR/VR experiences',
    features: ['Unity Development', 'HTML5 Games', 'Mobile Gaming', 'VR Experiences'],
    projects: ['Unity Games', 'HTML5 Games', 'VR Experiences']
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solutions',
    icon: '🏢',
    color: 'from-indigo-500 to-purple-600',
    description: 'Inventory systems, CRM, office automation',
    features: ['Custom CRM Systems', 'Inventory Management', 'Workflow Automation', 'Data Analytics'],
    projects: ['Army Inventory System', 'Real Estate CRM', 'HR Automation']
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: '📱',
    color: 'from-green-500 to-teal-600',
    description: 'iOS, Android, React Native apps',
    features: ['React Native Apps', 'iOS Development', 'Android Development', 'Cross-Platform Solutions'],
    projects: ['Social Apps', 'Productivity Tools', 'Games']
  },
  {
    id: 'custom',
    title: 'Custom Software',
    icon: '⚡',
    color: 'from-purple-500 to-pink-600',
    description: 'Tailored solutions for unique challenges',
    features: ['Desktop Applications', 'API Development', 'System Integration', 'Automation Tools'],
    projects: ['API Development', 'Desktop Apps', 'Automation Tools']
  }
] as const

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/forststalstudio', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/forststalstudio', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/forststalstudio', icon: 'twitter' },
  { name: 'Discord', href: 'https://discord.gg/forststalstudio', icon: 'discord' },
] as const

export const HERO_SERVICES = [
  "Training LLMs",
  "Building Games", 
  "Creating Websites",
  "Developing Apps",
  "Automating Workflows",
  "Designing Solutions"
] as const

export const TECH_ICONS = ['💻', '🎮', '🤖', '📱', '⚡', '🚀', '💡', '⚙️'] as const

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: '✨' },
  { id: 'ai', label: 'AI/ML', icon: '🤖' },
  { id: 'web', label: 'Web', icon: '🌐' },
  { id: 'game', label: 'Games', icon: '🎮' },
  { id: 'enterprise', label: 'Enterprise', icon: '🏢' },
  { id: 'mobile', label: 'Mobile', icon: '📱' }
] as const

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Updates' },
  { id: 'launches', label: 'Project Launches' },
  { id: 'teasers', label: 'Coming Soon' },
  { id: 'tech', label: 'Tech Updates' },
  { id: 'team', label: 'Team News' }
] as const

export const PROJECT_TYPES = [
  'AI/Machine Learning',
  'Web Development',
  'Game Development',
  'Mobile App',
  'Enterprise Solution',
  'Custom Software',
  'Other'
] as const

export const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000 - $100,000',
  'Above $100,000'
] as const

export const TEAM_MEMBERS = [
  {
    id: 'founder',
    name: 'Lead Developer',
    role: 'Founder & Lead Developer',
    bio: 'Passionate about creating innovative solutions that bridge the gap between cutting-edge technology and real-world applications.',
    avatar: '/team/founder.jpg',
    skills: ['Full-Stack Development', 'AI/ML', 'System Architecture']
  }
] as const