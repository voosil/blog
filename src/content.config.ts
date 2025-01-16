import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './data/posts' }),
  schema: z.object({
    title: z.string(),
    banner: z.optional(z.string()),
    description: z.optional(z.string()),
    date: z.union([z.string(), z.date()]),
    tags: z.optional(z.array(z.string())),
    relatedPosts: z.optional(z.array(reference('posts'))),
  }),
});

export const collections = { posts };
