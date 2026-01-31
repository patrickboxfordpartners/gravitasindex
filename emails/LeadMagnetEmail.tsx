import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface LeadMagnetEmailProps {
  name: string;
  downloadUrl: string;
}

export const LeadMagnetEmail = ({ name, downloadUrl }: LeadMagnetEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Entity Search Playbook is ready to download</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>GRAVITAS INDEX</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Your Playbook is Ready</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            Thanks for downloading <strong>The Entity Search Playbook</strong>. This guide
            breaks down exactly what's happening with Google's new ranking system and how
            to position yourself before your competitors figure it out.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={downloadUrl}>
              Download Playbook (PDF)
            </Button>
          </Section>

          <Text style={text}>
            <strong>What's inside:</strong>
          </Text>

          <Text style={listItem}>→ What Entity Search is and why it matters</Text>
          <Text style={listItem}>→ The two metrics Google is measuring right now</Text>
          <Text style={listItem}>→ Why response time beats ad spend</Text>
          <Text style={listItem}>→ How trust signals determine your ranking</Text>
          <Text style={listItem}>→ 5 immediate steps you can take today</Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>The window is closing.</strong>
              <br />
              <br />
              Entity Search rewards first movers. The agents who build infrastructure now
              will dominate their markets. The ones who wait will keep paying portals for
              scraps.
            </Text>
          </Section>

          <Text style={text}>
            Want to see how this applies to your specific market? Book a 15-minute
            qualification call:
          </Text>

          <Section style={buttonContainer}>
            <Button style={buttonSecondary} href="https://cal.com/gravitasindex/consultation">
              Schedule a Call
            </Button>
          </Section>

          <Text style={text}>
            Questions? Just reply to this email.
          </Text>

          <Text style={signature}>
            —Patrick Mitchell
            <br />
            Founder, GRAVITAS INDEX
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            © 2026 Gravitas Index. All rights reserved.
          </Text>
          <Text style={footerText}>
            <Link href="https://gravitasindex.com/privacy" style={link}>
              Privacy Policy
            </Link>
            {' · '}
            <Link href="https://gravitasindex.com/terms" style={link}>
              Terms
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default LeadMagnetEmail;

// Styles (same as WelcomeEmail, plus button styles)
const main = {
  backgroundColor: '#020617',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  padding: '20px 0',
  borderBottom: '1px solid #1e293b',
};

const logo = {
  fontSize: '18px',
  fontWeight: '800',
  color: '#f1f5f9',
  letterSpacing: '0.1em',
  margin: '0',
  fontFamily: 'monospace',
};

const content = {
  padding: '40px 20px',
};

const h1 = {
  fontSize: '32px',
  fontWeight: '400',
  color: '#f1f5f9',
  margin: '0 0 30px',
  fontFamily: '"Playfair Display", serif',
};

const text = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#cbd5e1',
  margin: '0 0 20px',
};

const listItem = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#cbd5e1',
  margin: '0 0 10px',
  paddingLeft: '20px',
};

const highlightBox = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderLeft: '3px solid #38bdf8',
  padding: '20px',
  margin: '30px 0',
};

const highlightText = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#f1f5f9',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#38bdf8',
  borderRadius: '0',
  color: '#000000',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  fontFamily: 'monospace',
};

const buttonSecondary = {
  backgroundColor: 'transparent',
  border: '1px solid #1e293b',
  borderRadius: '0',
  color: '#f1f5f9',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  fontFamily: 'monospace',
};

const signature = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#cbd5e1',
  margin: '40px 0 0',
  borderTop: '1px solid #1e293b',
  paddingTop: '20px',
};

const footer = {
  padding: '20px',
  borderTop: '1px solid #1e293b',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#64748b',
  margin: '5px 0',
};

const link = {
  color: '#38bdf8',
  textDecoration: 'none',
};
