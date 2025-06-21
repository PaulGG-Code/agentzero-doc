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
    resolve: (post: any) => `/docs/${post._raw.flattenedPath}`,
  },
  slug: {
    type: 'string',
    resolve: (doc: any) => doc._raw.flattenedPath,
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
