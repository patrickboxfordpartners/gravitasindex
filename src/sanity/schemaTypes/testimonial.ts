export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Solo Agent, Team Lead',
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
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this testimonial on the website',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'market',
      media: 'avatar',
    },
  },
};
