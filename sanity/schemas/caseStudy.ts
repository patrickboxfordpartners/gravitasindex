export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'market',
      title: 'Market',
      type: 'string',
      description: 'e.g. Denver, CO',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'agent',
      title: 'Agent Name',
      type: 'string',
      description: 'Can use first name only for privacy',
    },
    {
      name: 'beforeMetrics',
      title: 'Before Metrics',
      type: 'object',
      fields: [
        {
          name: 'portalSpend',
          title: 'Portal Spend',
          type: 'string',
          description: 'e.g. $2,800/month',
        },
        {
          name: 'closeRate',
          title: 'Close Rate',
          type: 'string',
          description: 'e.g. 1.8%',
        },
        {
          name: 'responseTime',
          title: 'Response Time',
          type: 'string',
          description: 'e.g. 4 hours',
        },
      ],
    },
    {
      name: 'afterMetrics',
      title: 'After Metrics',
      type: 'object',
      fields: [
        {
          name: 'responseTime',
          title: 'Response Time',
          type: 'string',
          description: 'e.g. 38 seconds',
        },
        {
          name: 'reviewCount',
          title: 'Review Count',
          type: 'string',
          description: 'e.g. 18 in 3 months',
        },
        {
          name: 'gci',
          title: 'GCI',
          type: 'string',
          description: 'e.g. $180K from organic',
        },
      ],
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      description: 'Brief summary of the results',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'market',
    },
  },
};
