import { Resend } from 'resend';

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender configuration
export const emailConfig = {
  from: 'GRAVITAS INDEX <hello@gravitasindex.com>',
  replyTo: 'hello@gravitasindex.com',
};
