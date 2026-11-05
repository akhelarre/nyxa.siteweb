import rss from '@astrojs/rss';
import { getAllArchiveEntries } from '../utils/archive';

export async function GET(context) {
  const allEntries = await getAllArchiveEntries();

  return rss({
    title: 'NYXA.WTF // SYS.33 ARCHIVE',
    description: 'Portal personal, estudios de cine, ensayos y literatura por Nyxa NV.',
    site: context.site,
    items: allEntries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description || '',
      link: entry.url,
    })),
    customData: `<language>es-cl</language>`,
  });
}
