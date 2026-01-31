import {
  Body,
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

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Gravitas Index - Your application is under review</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>GRAVITAS INDEX</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Application Received</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            Thank you for applying to Gravitas Index. We've received your application and
            are reviewing it now.
          </Text>

          <Text style={text}>
            <strong>What happens next:</strong>
          </Text>

          <Text style={listItem}>
            → We'll review your application within 24 hours
          </Text>
          <Text style={listItem}>
            → If it's a fit, we'll reach out to schedule a qualification call
          </Text>
          <Text style={listItem}>
            → On the call, we'll walk through the system and answer your questions
          </Text>

          <Text style={text}>
            While you wait, here's what you should know about Entity Search:
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>
              Google is already measuring response times and trust signals in your market.
              The agents who move now will own page one. The ones who wait will keep paying
              Zillow.
            </Text>
          </Section>

          <Text style={text}>
            Have questions? Reply to this email or reach out at hello@gravitasindex.com.
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

export default WelcomeEmail;

// Styles
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
