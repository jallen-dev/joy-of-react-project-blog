import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import { loadBlogPost } from "@/helpers/file-helpers";

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  if (!blogPost) {
    notFound();
  }

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

const components = {
  pre: CodeSnippet,
  DivisionGroupsDemo: dynamic(() => import("@/components/DivisionGroupsDemo")),
  CircularColorsDemo: dynamic(() => import("@/components/CircularColorsDemo")),
};

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  if (!blogPost) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
