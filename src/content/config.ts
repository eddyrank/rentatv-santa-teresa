import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    // Required so every post (including future ones) ships with a TL;DR box.
    tldr:        z.array(z.string()).min(2).max(5),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author:      z.string().default('Rent ATV Santa Teresa'),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { blog };
