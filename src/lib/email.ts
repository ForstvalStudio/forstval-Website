import nodemailer from 'nodemailer';
import { ContactFormData } from './validations';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactFormEmail(data: ContactFormData) {
  const serviceTypeLabels = {
    'ai-ml': 'AI & Machine Learning',
    'web-development': 'Web Development',
    'game-development': 'Game Development',
    'enterprise-solutions': 'Enterprise Solutions',
    'custom-software': 'Custom Software',
    'consulting': 'Consulting'
  };

  const projectTypeLabels = {
    'new-project': 'New Project',
    'enhancement': 'Enhancement',
    'maintenance': 'Maintenance',
    'consulting': 'Consulting',
    'emergency-support': 'Emergency Support'
  };

  const budgetLabels = {
    'under-5k': 'Under $5,000',
    '5k-15k': '$5,000 - $15,000',
    '15k-50k': '$15,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    'over-100k': 'Over $100,000',
    'discuss': 'Let\'s Discuss'
  };

  const timelineLabels = {
    'asap': 'ASAP',
    '1-month': '1 Month',
    '3-months': '3 Months',
    '6-months': '6 Months',
    '1-year': '1 Year',
    'flexible': 'Flexible'
  };

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366F1;">New Contact Form Submission</h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      </div>

      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e293b; margin-top: 0;">Project Details</h3>
        <p><strong>Service Type:</strong> ${serviceTypeLabels[data.serviceType]}</p>
        <p><strong>Project Type:</strong> ${projectTypeLabels[data.projectType]}</p>
        <p><strong>Budget Range:</strong> ${budgetLabels[data.budgetRange]}</p>
        <p><strong>Timeline:</strong> ${timelineLabels[data.timeline]}</p>
      </div>

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `;

  // Send to admin
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.SMTP_USER,
    subject: `New Project Inquiry from ${data.name}`,
    html: emailContent,
  });

  // Send confirmation to client
  const confirmationContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366F1;">Thank you for your inquiry!</h2>
      
      <p>Hi ${data.name},</p>
      
      <p>We've received your project inquiry and we're excited to learn more about your ${serviceTypeLabels[data.serviceType].toLowerCase()} needs.</p>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e293b; margin-top: 0;">What happens next?</h3>
        <ul style="color: #475569;">
          <li>Our team will review your requirements within 24 hours</li>
          <li>We'll prepare a detailed proposal tailored to your needs</li>
          <li>We'll schedule a consultation call to discuss your project</li>
        </ul>
      </div>
      
      <p>If you have any urgent questions, feel free to reply to this email or call us directly.</p>
      
      <p>Best regards,<br>The ForstvalStudio Team</p>
      
      <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; color: #64748b; font-size: 14px;">
        <p>ForstvalStudio - Where Every Tech Dream Finds Its Home</p>
        <p>Website: ${process.env.SITE_URL}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: data.email,
    subject: 'Thank you for your inquiry - ForstvalStudio',
    html: confirmationContent,
  });
}

export async function sendNewsletterWelcomeEmail(email: string, name?: string) {
  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366F1;">Welcome to ForstvalStudio Newsletter!</h2>
      
      <p>Hi ${name || 'there'},</p>
      
      <p>Thank you for subscribing to our newsletter! You'll now receive:</p>
      
      <ul style="color: #475569;">
        <li>Latest tech insights and tutorials</li>
        <li>Project updates and case studies</li>
        <li>Industry trends and best practices</li>
        <li>Exclusive resources and tools</li>
      </ul>
      
      <p>We're excited to share our knowledge and help you on your tech journey!</p>
      
      <p>Best regards,<br>The ForstvalStudio Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Welcome to ForstvalStudio Newsletter',
    html: content,
  });
}