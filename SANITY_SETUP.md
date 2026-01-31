# Sanity CMS Setup Guide

## Overview

Your Gravitas Index application is now configured to use Sanity.io as a headless CMS. This allows you to manage content (FAQs, case studies, spot counts) without touching code.

---

## Step 1: Create Sanity Project

### 1.1 Sign Up for Sanity
```bash
# Go to https://sanity.io and create an account
# Or use the CLI:
npm create sanity@latest
```

### 1.2 Create Project
When prompted:
- **Project name**: Gravitas Index
- **Dataset**: production
- **Project template**: Clean project (no starter)

### 1.3 Get Project Credentials
After creation, note:
- **Project ID**: Found in project settings
- **Dataset**: production (default)

---

## Step 2: Configure Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

To get API token:
1. Go to https://sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create new token with "Editor" permissions
5. Copy token to `.env.local`

---

## Step 3: Deploy Schemas to Sanity

### 3.1 Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### 3.2 Login to Sanity
```bash
sanity login
```

### 3.3 Initialize Sanity Studio
```bash
# From your project root
npx sanity init --project-id YOUR_PROJECT_ID --dataset production
```

### 3.4 Deploy Schemas
```bash
npx sanity deploy
```

This creates a hosted studio at: `https://your-project.sanity.studio`

---

## Step 4: Import Seed Data

### 4.1 Using Sanity Studio UI

1. Go to `https://your-project.sanity.studio`
2. Manually create documents using the seed data from `sanity/seed-data.json`

**For FAQs:**
- Click "FAQ" in sidebar
- Click "Create new FAQ"
- Copy question/answer from seed-data.json
- Set category and order
- Publish

**For Case Studies:**
- Click "Case Study"
- Fill in all fields from seed data
- Publish

**For Spot Counts:**
- Click "Spot Count"
- Enter market name and counts
- Publish

### 4.2 Using Sanity CLI (Advanced)

```bash
# Install import tool
npm install -g @sanity/import

# Import seed data
sanity dataset import sanity/seed-data.json production
```

---

## Step 5: Content Types Explained

### FAQ
Manages frequently asked questions.

**Fields:**
- `question` (string) - The question text
- `answer` (text) - The answer (supports line breaks)
- `category` (string) - general, technical, pricing, process
- `order` (number) - Display order (lower = first)

**Usage:**
FAQs automatically appear on `/faq` page in order specified.

### Case Study
Showcases client results.

**Fields:**
- `title` (string) - Case study headline
- `market` (string) - City, State
- `agent` (string) - Client name (can be first name only)
- `beforeMetrics` (object) - Portal spend, close rate, response time
- `afterMetrics` (object) - Response time, review count, GCI
- `summary` (text) - Brief results summary
- `date` (date) - Implementation date

**Usage:**
Case studies can be displayed on homepage or dedicated page.

### Spot Count
Tracks available spots per market.

**Fields:**
- `market` (string) - City, State
- `spotsRemaining` (number) - 0-12
- `totalSpots` (number) - Default 12
- `lastUpdated` (datetime) - Auto-updated

**Usage:**
Display "X spots remaining" on forms and marketing pages.

### Testimonial
Client testimonials (currently inactive).

**Fields:**
- `name` (string) - Client name
- `role` (string) - Solo Agent, Team Lead, etc.
- `market` (string) - City, State
- `quote` (text) - Testimonial text
- `avatar` (image) - Optional photo
- `order` (number) - Display order
- `active` (boolean) - Show/hide toggle

**Usage:**
Will be displayed on homepage when activated in future phase.

---

## Step 6: Managing Content

### Editing FAQ
1. Go to Sanity Studio
2. Click "FAQ" in sidebar
3. Click on any question to edit
4. Make changes
5. Click "Publish"
6. Website updates automatically (within 1 hour)

### Updating Spot Counts
1. Go to "Spot Count"
2. Select market
3. Update `spotsRemaining` field
4. Click "Publish"
5. Forms will show updated count

### Adding Case Studies
1. Click "Case Study"
2. Click "Create new Case Study"
3. Fill in all metrics
4. Add compelling summary
5. Publish
6. Use in email sequences or homepage

---

## Step 7: Querying Content in Code

Content is automatically fetched using the queries in `src/lib/sanity/queries.ts`.

### Example: Get All FAQs
```typescript
import { getFAQs } from '@/lib/sanity/queries';

const faqs = await getFAQs();
// Returns array of FAQ objects
```

### Example: Get Spot Count
```typescript
import { getSpotCount } from '@/lib/sanity/queries';

const spots = await getSpotCount('Denver, CO');
// Returns spot count object or null
```

### Example: Get Case Studies
```typescript
import { getCaseStudies } from '@/lib/sanity/queries';

const studies = await getCaseStudies();
// Returns array ordered by date (newest first)
```

---

## Step 8: Content Revalidation

Content is cached for 1 hour by default (3600 seconds).

To change revalidation:
```typescript
// In any page file
export const revalidate = 1800; // 30 minutes
export const revalidate = 0;    // No caching (always fresh)
```

To manually revalidate after publishing:
```typescript
// Add revalidate API route (future enhancement)
// Or use Sanity webhooks to trigger revalidation
```

---

## Step 9: Sanity Studio Customization

### Access Control
By default, anyone with studio link can view. To restrict:
1. Go to project settings
2. Add team members with specific permissions
3. Set up roles (Viewer, Editor, Admin)

### Preview Mode
Enable preview of draft content before publishing:
1. Configure preview in `sanity.config.ts`
2. Add preview button in studio
3. View unpublished changes

### Custom Views
Add custom desk structure in `sanity.config.ts`:
```typescript
desk: {
  structure: (S) =>
    S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('FAQs by Category')
          .child(/* custom view */),
      ]),
}
```

---

## Troubleshooting

### Content Not Showing
1. Check project ID in `.env.local` is correct
2. Verify content is published (not draft)
3. Check browser console for errors
4. Verify API token has read permissions

### Studio Not Loading
1. Ensure schemas are deployed: `npx sanity deploy`
2. Check project ID matches
3. Clear browser cache
4. Check Sanity status page

### Images Not Displaying
1. Install image URL builder: `npm install @sanity/image-url`
2. Use image helper functions
3. Ensure images are published
4. Check CORS settings in Sanity

---

## Best Practices

### Content Guidelines
- **FAQs**: Keep answers concise but complete
- **Case Studies**: Use real numbers, be specific
- **Spot Counts**: Update weekly or when leads convert
- **Order Fields**: Use increments of 10 (10, 20, 30) for easy reordering

### Security
- Never commit API tokens to git
- Use read-only tokens for public-facing queries
- Use editor tokens only in secure API routes
- Enable CORS restrictions in production

### Performance
- Use CDN for fast reads (enabled by default)
- Cache queries appropriately
- Use GROQ projections to fetch only needed fields
- Consider implementing webhooks for instant updates

---

## Next Steps

1. **Create your Sanity project**
2. **Deploy schemas**
3. **Import seed data**
4. **Test editing content**
5. **Verify website updates**
6. **Train team on Studio**

Once Sanity is configured, you can manage all content without touching code!

---

## Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Schema Types**: https://www.sanity.io/docs/schema-types
- **Studio Customization**: https://www.sanity.io/docs/the-studio

---

Last Updated: January 31, 2026
