import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stringOrArrayToString = z
  .any()
  .optional()
  .transform((val) => {
    if (!val) return undefined;
    if (Array.isArray(val)) return val.filter(Boolean).map(String).join(', ');
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  });

const dateOrAny = z
  .any()
  .optional()
  .transform((val) => {
    if (!val) return undefined;
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  });

const entrySchema = z
  .object({
    title: stringOrArrayToString,
    pubDate: dateOrAny,
    date: dateOrAny,
    created: dateOrAny,
    description: stringOrArrayToString,
    author: stringOrArrayToString,
    collection: stringOrArrayToString,
    layout: stringOrArrayToString,
    image: z
      .any()
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        if (typeof val === 'string') return { url: val, alt: '' };
        if (typeof val === 'object' && val.url) return { url: String(val.url), alt: String(val.alt || '') };
        return undefined;
      }),
    tags: z
      .any()
      .optional()
      .transform((val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val.filter(Boolean).map(String);
        return [String(val)];
      }),
  })
  .passthrough();

export const collections = {
  cinema_studies: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/cinema_studies' }),
    schema: entrySchema,
  }),
  essays: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
    schema: entrySchema,
  }),
  literature: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/literature' }),
    schema: entrySchema,
  }),
};
