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

interface FollowUpEmailProps {
  name: string;
  dayNumber: number; // 1, 3, or 7
}

export const FollowUpEmail = ({ name, dayNumber }: FollowUpEmailProps) => {
  const content = getContentForDay(dayNumber);

  return (
    <Html>
      <Head />
      <Preview>{content.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>GRAVITAS INDEX</Text>
          </Section>

          <Section style={contentSection}>
            <Heading style={h1}>{content.headline}</Heading>

            <Text style={text}>Hi {name},</Text>

            {content.body.map((paragraph, index) => (
              <Text key={index} style={text}>
                {paragraph}
              </Text>
            ))}

            <Section style={highlightBox}>
              <Text style={highlightText}>{content.highlight}</Text>
            </Section>

            {content.cta && (
              <Section style={buttonContainer}>
                <Button style={button} href={content.cta.url}>
                  {content.cta.text}
                </Button>
              </Section>
            )}

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
};

export default FollowUpEmail;

// Content generator based on day
function getContentForDay(day: number) {
  const contentMap: Record<number, any> = {
    1: {
      preview: 'Why most agents will miss the Entity Search shift',
      headline: 'The First-Mover Advantage',
      body: [
        'Quick question: When was the last time you changed your systems?',
        'Most agents run the same playbook they learned in 2015. Buy leads. Chase portals. Hope for referrals. It worked then. It\'s dying now.',
        'Entity Search changes everything. Google is building a knowledge graph of your market—who the agents are, how fast they respond, how trusted they are. The agents who understand this and adapt now will dominate.',
        'The ones who wait will wake up in 12 months wondering why their phone stopped ringing.',
      ],
      highlight:
        'First movers in every market we\'ve tracked see a 40-60% increase in inbound leads within 90 days. Not because of ads. Because of infrastructure.',
      cta: {
        text: 'Book a Qualification Call',
        url: 'https://cal.com/gravitasindex/consultation',
      },
    },
    3: {
      preview: 'Case study: How one agent went from invisible to #1',
      headline: 'Real Results: Denver Market',
      body: [
        'I want to show you something specific.',
        'One of our clients in Denver was spending $2,800/month on Zillow leads. Close rate: 1.8%. She was working 70-hour weeks just to break even.',
        'We implemented the Gravitas system in January 2025. Response infrastructure, review automation, entity optimization. The whole stack.',
        'Within 90 days: Response time dropped from 4 hours to 38 seconds. Review velocity went from 2/year to 18 in three months. Google Entity Search rolled out in Denver in March. She owns position 1-3 for every major search term in her zip code.',
        'She canceled her Zillow contract in April. Now doing $180K in GCI from organic search alone.',
      ],
      highlight:
        'This isn\'t luck. It\'s infrastructure. The system works when Google measures what you\'ve already built.',
      cta: {
        text: 'See How This Applies to Your Market',
        url: 'https://cal.com/gravitasindex/consultation',
      },
    },
    7: {
      preview: 'Limited spots remaining - Final call',
      headline: 'Final Notice: 3 Spots Left',
      body: [
        'This is the last email in this sequence.',
        'We limit capacity to 12 agents per market. Right now, we have 3 spots open in your area. When they fill, we close applications and open a waitlist.',
        'If you\'re still reading these emails, you\'re thinking about it. That means you understand what\'s coming. You see the shift. You know the portals aren\'t sustainable.',
        'The question is whether you\'re willing to move now or wait and see what happens.',
        'The agents who move now get the advantage. The ones who wait get to watch from the sidelines.',
      ],
      highlight:
        'Entity Search is rolling out market by market. When it hits yours, you\'ll either be ready or you\'ll be scrambling. Which sounds better?',
      cta: {
        text: 'Book Your Call Now',
        url: 'https://cal.com/gravitasindex/consultation',
      },
    },
  };

  return contentMap[day];
}

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

const contentSection = {
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
