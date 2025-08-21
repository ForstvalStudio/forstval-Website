# ForstvalStudio - Professional Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive portfolio website for ForstvalStudio featuring smooth animations, tech-inclusive design, and professional presentation.

## 🌟 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Built with Next.js for optimal performance
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Tech-Inclusive**: Designed to appeal to diverse tech professionals
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Contact Forms**: Interactive contact functionality
- **Dynamic Routing**: Blog and portfolio with dynamic pages

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MySQL (production)
- **Email**: Nodemailer
- **Deployment**: VPS hosting

## 📁 Project Structure

```
forststalstudio/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── (pages)/        # Page components
│   │   ├── api/            # API routes
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable components
│   │   ├── sections/       # Page sections
│   │   ├── ui/             # UI components
│   │   └── layout/         # Layout components
│   └── lib/                # Utilities and configurations
├── public/                 # Static assets
├── docs/                   # Documentation
└── scripts/                # Build and deployment scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/forststalstudio.git
   cd forststalstudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run build:production` - Build with production optimizations

## 🌐 Deployment

### VPS Deployment
For detailed VPS deployment instructions, see [HOSTINGER-DEPLOYMENT.md](./HOSTINGER-DEPLOYMENT.md)

### Quick Deploy Steps:
1. Clone repository on your VPS
2. Install dependencies
3. Configure environment variables
4. Build the application
5. Set up Nginx reverse proxy
6. Configure SSL with Let's Encrypt
7. Start with PM2 process manager

## ⚙️ Configuration

### Environment Variables
Copy `.env.example` to `.env.production` and configure:

```env
SITE_URL=https://yourdomain.com
NODE_ENV=production
DATABASE_URL=mysql://username:password@localhost:3306/database
SMTP_HOST=smtp.yourdomain.com
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_password
```

### Next.js Configuration
The project uses a dynamic Next.js configuration optimized for VPS hosting with:
- Image optimization enabled
- Compression enabled
- Custom webpack configuration
- Environment-specific settings

## 🎨 Customization

### Styling
- **Colors**: Edit Tailwind config in `tailwind.config.ts`
- **Typography**: Modify font settings in `src/app/layout.tsx`
- **Components**: Customize components in `src/components/`

### Content
- **Portfolio Items**: Add/edit in portfolio data files
- **Blog Posts**: Manage through API routes or CMS integration
- **Contact Info**: Update in layout components

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

All animations and interactions are optimized for touch devices.

## 🔧 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Core Web Vitals**: All green metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [deployment guides](./docs/)
2. Review existing [GitHub issues](https://github.com/yourusername/forststalstudio/issues)
3. Create a new issue with detailed information

## 🌟 Features Roadmap

- [ ] Blog CMS integration
- [ ] Advanced contact form with file uploads
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Client portal functionality
- [ ] Dark/light theme toggle

## 🏢 About ForstvalStudio

ForstvalStudio is a professional digital agency focused on creating inclusive, modern web solutions for diverse tech professionals and businesses.

---

**Made with ❤️ by ForstvalStudio**

[Website](https://forststalstudio.com) • [Portfolio](https://forststalstudio.com/portfolio) • [Contact](https://forststalstudio.com/contact)