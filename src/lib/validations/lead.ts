import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  market: z.string().min(2, 'Market is required'),
  role: z.string().optional(),
  pain: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
