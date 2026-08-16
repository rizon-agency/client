import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { Icons } from "@/components/icons/icons";

export const title = "SaasCN";
export const description =
  "A powerful platform to streamline your business operations.";
export const owner = "SaasCN";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: "https://github.com/techwithanirudh/shadcn-saas-landing",
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.info />,
    text: "About",
    url: "/about",
    active: "url",
  },
  {
    icon: <Icons.pricing />,
    text: "Pricing",
    url: "/pricing",
    active: "url",
  },
  {
    type: "menu",
    text: "Blog",
    items: [
      {
        text: "Posts",
        description: "View all blog posts",
        url: "/blog",
        icon: <Icons.posts />,
      },
      {
        text: "Tags",
        description: "View blog posts by tags",
        url: "/tags",
        icon: <Icons.tags />,
      },
    ],
  },
];

export const postsPerPage = 5;
