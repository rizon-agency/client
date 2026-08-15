import type { Metadata } from "next";
import { ArrowRight, Cat } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Logo } from "@repo/ui/logo-mark";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    siteName: "Client",
    title: "Ideas for building a calmer product",
    description:
      "Notes on thoughtful software, curious work, and the occasional excellent cat.",
    path: "/blog",
  });
}

export default async function Blog() {
  const post = await getBlogPost("cats");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="mx-auto flex h-20 max-w-4xl items-center justify-between px-6">
        <Link href="/" aria-label="Client home">
          <Logo size={38} />
        </Link>
        <Button asChild variant="outline">
          <Link href="/">Client home</Link>
        </Button>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-16">
        <p className="text-sm font-medium text-primary">From the blog</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Ideas for building a calmer product
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Notes on thoughtful software, curious work, and the occasional
          excellent cat.
        </p>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Cat className="size-6" />
              </div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {post.displayDate} · {post.readingTime}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link">
                <Link href="/blog/cats">
                  Read article <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
