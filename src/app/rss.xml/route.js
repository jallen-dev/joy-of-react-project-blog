import RSS from "rss";

import { getBlogPostList } from "@/helpers/file-helpers";

export async function GET() {
  const feed = new RSS({
    title: "Bits & Bytes",
    description: "A wonderful blog about JavaScript",
    feed_url: "http://localhost:3000/rss.xml",
    site_url: "http://localhost:3000/",
    managingEditor: "Justin Allen",
    webMaster: "Justin Allen",
    language: "en",
    categories: ["JavaScript", "programming", "web development"],
    pubDate: Date.now(),
    ttl: "60",
  });

  const blogPosts = await getBlogPostList();
  blogPosts.forEach((blogPost) => {
    feed.item({
      title: blogPost.title,
      description: blogPost.abstract,
      url: `http://localhost:3000/${blogPost.slug}`,
      guid: blogPost.slug,
      custom_elements: [
        {
          "content:encoded": blogPost.abstract,
        },
        {
          pubDate: new Date(blogPost.publishedOn).toLocaleString(),
        },
      ],
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
