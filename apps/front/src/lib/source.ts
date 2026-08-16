import { blog } from "fumadocs-mdx:collections/server";
import type { MetaData, Source } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import {
  type DocCollectionEntry,
  toFumadocsSource,
} from "fumadocs-mdx/runtime/server";

// fumadocs-mdx's generated types drop our frontmatter schema (the `date`
// transform in source.config.ts collapses schema inference to `never`), so
// restate the page data here. Keep in sync with source.config.ts.
type BlogData = DocCollectionEntry<
  "blog",
  {
    title: string;
    description?: string;
    date: Date;
    author: string;
    tags?: string[];
    image?: string;
    lastModified?: Date;
  }
>;

const fumaSource = toFumadocsSource(blog, []) as unknown as Source<{
  pageData: BlogData;
  metaData: MetaData;
}>;

export const source = loader(fumaSource, {
  baseUrl: "/blog",
});

export const { getPage: getPost, getPages: getPosts, pageTree } = source;

export type Post = ReturnType<typeof getPost>;
export type PageTree = typeof pageTree;
export type Page = ReturnType<typeof getPosts>[number];

const posts = getPosts();

export const getSortedByDatePosts = () =>
  posts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());

export const getTags = () => {
  const tagSet = new Set<string>();

  for (const post of posts) {
    if (post.data.tags) {
      for (const tag of post.data.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).toSorted();
};

export const getPostsByTag = (tag: string) => {
  return posts
    .filter((post) => post.data.tags?.includes(tag))
    .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
};
