// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import { codeImport } from 'remark-code-import';
import rehypeSlug from 'rehype-slug';
import highlight from 'rehype-highlight';
import { ComputedFields } from 'contentlayer2/source-files';

const computedFields: ComputedFields = {
  url: {
    type: 'string',
    resolve: (post: any) => {
      const path = post._raw.flattenedPath;
      if (path.startsWith('fr/')) {
        return `/fr/docs/${path.substring(3)}`;
      }
      if (path.startsWith('it/')) {
        return `/it/docs/${path.substring(3)}`;
      }
      if (path.startsWith('es/')) {
        return `/es/docs/${path.substring(3)}`;
      }
      return `/en/docs/${path}`;
    },
  },
  slug: {
    type: 'string',
    resolve: (doc: any) => doc._raw.flattenedPath,
  },
  locale: {
    type: 'string',
    resolve: (doc: any) => {
      const path = doc._raw.flattenedPath;
      if (path.startsWith('fr/')) return 'fr';
      if (path.startsWith('it/')) return 'it';
      if (path.startsWith('es/')) return 'es';
      return 'en';
    },
  },
  headings: {
    type: 'json',
    resolve: async (doc: any) => {
      const regXHeader = /^(###|##|#)\s(.+)/;
      const unescapedContent = doc.body.raw.replace(/\\n/g, '\n');
      const headings = unescapedContent
        .split('\n')
        .map((line: any) => {
          const match = line.match(regXHeader);
          if (match) {
            const level = match[1].length;
            const title = match[2].trim();
            const slug = title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s/g, '-');
            return {
              level,
              title,
              slug,
            };
          }
          return null;
        })
        .filter(Boolean);
      return headings;
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Docs',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  markdown: { fileExtensions: ['mdx', 'md'] }, // Ensure it watches these files
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    date: { type: 'date', required: false },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'docs',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [rehypeSlug, highlight],
  },
});
