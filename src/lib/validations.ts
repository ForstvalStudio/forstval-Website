import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100, 'Company name too long').optional(),
  phone: z.string().max(20, 'Phone number too long').optional(),
  serviceType: z.enum([
    'ai-ml',
    'web-development', 
    'game-development',
    'enterprise-solutions',
    'custom-software',
    'consulting'
  ]),
  projectType: z.enum([
    'new-project',
    'enhancement',
    'maintenance',
    'consulting',
    'emergency-support'
  ]),
  budgetRange: z.enum([
    'under-5k',
    '5k-15k',
    '15k-50k',
    '50k-100k',
    'over-100k',
    'discuss'
  ]),
  timeline: z.enum([
    'asap',
    '1-month',
    '3-months',
    '6-months',
    '1-year',
    'flexible'
  ]),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
});

export const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').optional(),
});

export const CommentSchema = z.object({
  postId: z.number().positive(),
  parentId: z.number().positive().optional(),
  authorName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  authorEmail: z.string().email('Invalid email address'),
  authorWebsite: z.string().url('Invalid website URL').optional().or(z.literal('')),
  content: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment too long'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type NewsletterData = z.infer<typeof NewsletterSchema>;
export type CommentData = z.infer<typeof CommentSchema>;