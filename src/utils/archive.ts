export type CollectionName = 'cinema_studies' | 'essays' | 'literature';

export interface CollectionMeta {
  id: CollectionName;
  code: string;
  title: string;
  label: string;
  subtitle: string;
  badge: string;
}

export const COLLECTION_META: Record<CollectionName, CollectionMeta> = {
  cinema_studies: {
    id: 'cinema_studies',
    code: '01 // CINEMA_STUDIES',
    title: 'CINEMA_STUDIES',
    label: 'Estudios de Cine & Medios',
    subtitle: 'Teoría de la imagen, crítica medial, cátedras, análisis cinematográfico y cine-sensación.',
    badge: 'ARCHIVO DE IMAGEN, MONTAJE & CÁTEDRA',
  },
  essays: {
    id: 'essays',
    code: '02 // ESSAYS',
    title: 'ESSAYS',
    label: 'Ensayos & Pensamiento',
    subtitle: 'Ensayos de filosofía, política, lengua híbrida, ciberespacio y pensamiento situado.',
    badge: 'PENSAMIENTO SITUADO, FILOSOFÍA & CIBERESPACIO',
  },
  literature: {
    id: 'literature',
    code: '03 // LITERATURE',
    title: 'LITERATURE',
    label: 'Literatura & Crónicas',
    subtitle: 'Narrativa, crónicas de Fosas Negras, memoria histórica y prosa experimental.',
    badge: 'NARRATIVA, POESÍA & CRÓNICAS DE FOSAS NEGRAS',
  },
};

export function toSlug(input: string): string {
  return (
    input
      .replace(/\.md$/i, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'entry'
  );
}

function formatTitleFromPath(filePath: string): string {
  const base = filePath.split('/').pop() || ' Sin título';
  return base.replace(/\.md$/i, '').replace(/^!\s*/, '').trim();
}

function extractExcerpt(raw: string | undefined): string {
  if (!raw) return '';
  const withoutFm = raw.replace(/^---[\s\S]*?---\s*/, '');
  const clean = withoutFm
    .replace(/^#+\s+.*/gm, '')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '$2$1')
    .replace(/[*_~`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return '';
  return clean.length > 155 ? clean.slice(0, 152) + '...' : clean;
}

function normalizeImage(val: any): { url: string; alt: string } | undefined {
  if (!val) return undefined;
  if (typeof val === 'string') return { url: val, alt: '' };
  if (typeof val === 'object' && val.url) {
    return { url: String(val.url), alt: String(val.alt || '') };
  }
  return undefined;
}

export async function getAllArchiveEntries() {
  // Carga directa vía Vite import.meta.glob para que funcione en caliente en `astro dev`
  // sin depender de reiniciar el servidor ni del caché de data-store.
  const modules = import.meta.glob('../content/**/*.md', { eager: true }) as Record<string, any>;

  const entries = Object.entries(modules)
    .map(([filePath, mod]) => {
      const normalizedPath = filePath.replace(/\\/g, '/');
      const match = normalizedPath.match(/\/content\/(cinema_studies|essays|literature)\/([^/]+)\.md$/i);
      if (!match) return null;

      const collectionName = match[1] as CollectionName;
      const fileName = match[2];
      const slug = toSlug(fileName);
      const fm = mod.frontmatter || {};

      const title = fm.title ? String(fm.title) : formatTitleFromPath(normalizedPath);
      const rawDate = fm.pubDate || fm.date || fm.created;
      const parsedDate = rawDate ? new Date(rawDate) : new Date('2025-01-01');
      const pubDate = !isNaN(parsedDate.getTime()) ? parsedDate : new Date('2025-01-01');
      const hasExplicitDate = Boolean(rawDate && !isNaN(parsedDate.getTime()));

      const rawBody = typeof mod.rawContent === 'function' ? mod.rawContent() : '';
      const description = fm.description ? String(fm.description) : extractExcerpt(rawBody);

      const tags: string[] = Array.isArray(fm.tags)
        ? fm.tags.filter(Boolean).map((t: any) => String(t))
        : fm.tags
          ? [String(fm.tags)]
          : [];

      const author = Array.isArray(fm.author)
        ? fm.author.filter(Boolean).join(', ')
        : fm.author
          ? String(fm.author)
          : 'Nyxa NV';

      const image = normalizeImage(fm.image);

      return {
        id: slug,
        slugParam: slug,
        filePath: normalizedPath,
        collectionName,
        url: `/${collectionName}/${slug}/`,
        Content: mod.Content,
        data: {
          title,
          author,
          pubDate,
          hasExplicitDate,
          description,
          tags,
          image,
          collection: collectionName,
        },
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return entries.sort((a, b) => {
    const diff = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    if (diff !== 0) return diff;
    return a.data.title.localeCompare(b.data.title, 'es');
  });
}

export async function getCollectionEntries(collectionName: CollectionName) {
  const all = await getAllArchiveEntries();
  return all.filter((entry) => entry.collectionName === collectionName);
}
