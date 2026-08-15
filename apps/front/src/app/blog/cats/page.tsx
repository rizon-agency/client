import type { Metadata } from "next";
import { ArrowLeft, Cat } from "lucide-react";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@repo/ui/components/ui/button";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const post = await getBlogPost("cats");

  return buildMetadata({
    siteName: "Client",
    title: post.title,
    description: post.description,
    path: "/blog/cats",
  });
}

export default async function CatsArticle() {
  const post = await getBlogPost("cats");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Button asChild variant="ghost">
          <Link href="/blog">
            <ArrowLeft className="size-4" /> Back to the blog
          </Link>
        </Button>

        <header className="mt-12 border-b border-border pb-10">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Cat className="size-7" />
          </div>
          <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-8 text-muted-foreground">
            {post.description}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            {post.displayDate} · {post.readingTime}
          </p>
        </header>

        <div className="py-10 text-lg leading-8 text-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-muted-foreground [&_pre]:mt-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-6 [&_table]:mt-5 [&_table]:w-full [&_table]:text-sm [&_td]:border-b [&_td]:border-border [&_td]:p-3 [&_th]:border-b [&_th]:border-border [&_th]:p-3 [&_th]:text-left [&_th]:font-medium">
          <MarkdownAsync
            rehypePlugins={[
              [
                rehypePrettyCode,
                {
                  keepBackground: false,
                  theme: "github-dark",
                },
              ],
            ]}
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </MarkdownAsync>
        </div>
      </article>
    </main>
  );
}
