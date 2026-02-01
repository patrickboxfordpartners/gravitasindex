export default {
  name: 'spotCount',
  title: 'Spot Count',
  type: 'document',
  fields: [
    {
      name: 'market',
      title: 'Market',
      type: 'string',
      description: 'e.g. Denver, CO',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'spotsRemaining',
      title: 'Spots Remaining',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).max(12),
    },
    {
      name: 'totalSpots',
      title: 'Total Spots',
      type: 'number',
      initialValue: 12,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'market',
      spotsRemaining: 'spotsRemaining',
      totalSpots: 'totalSpots',
    },
    prepare({ title, spotsRemaining, totalSpots }: any) {
      return {
        title,
        subtitle: `${spotsRemaining} of ${totalSpots} spots remaining`,
      };
    },
  },
};
