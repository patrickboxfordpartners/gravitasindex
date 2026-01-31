import { render } from '@react-email/render';
import { resend, emailConfig } from './resend';
import WelcomeEmail from '../../../emails/WelcomeEmail';
import LeadMagnetEmail from '../../../emails/LeadMagnetEmail';
import FollowUpEmail from '../../../emails/FollowUpEmail';
import { SequenceType } from './sequences';

interface SendEmailParams {
  to: string;
  name: string;
  sequenceType: SequenceType;
  downloadUrl?: string;
}

export async function sendSequenceEmail({
  to,
  name,
  sequenceType,
  downloadUrl,
}: SendEmailParams) {
  try {
    let subject: string;
    let html: string;

    switch (sequenceType) {
      case 'welcome':
        subject = 'Welcome to Gravitas Index';
        html = render(WelcomeEmail({ name }));
        break;

      case 'lead_magnet':
        if (!downloadUrl) {
          throw new Error('Download URL required for lead magnet email');
        }
        subject = 'Your Entity Search Playbook is Ready';
        html = render(LeadMagnetEmail({ name, downloadUrl }));
        break;

      case 'follow_up_day1':
        subject = 'The First-Mover Advantage';
        html = render(FollowUpEmail({ name, dayNumber: 1 }));
        break;

      case 'follow_up_day3':
        subject = 'Real Results: Denver Market Case Study';
        html = render(FollowUpEmail({ name, dayNumber: 3 }));
        break;

      case 'follow_up_day7':
        subject = 'Final Notice: Limited Spots Remaining';
        html = render(FollowUpEmail({ name, dayNumber: 7 }));
        break;

      default:
        throw new Error(`Unknown sequence type: ${sequenceType}`);
    }

    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      replyTo: emailConfig.replyTo,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
