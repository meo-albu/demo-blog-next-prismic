import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Prismic from "@prismicio/client";
import { Client } from "../../prismic/prismic";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Layout from "../../layouts/Layout";

export async function getStaticProps() {
  const { results } = await Client.query(
    Prismic.Predicates.at("document.type", "blog-post")
  );

  return {
    props: {
      blogPosts: results,
    },
  };
}

const Home: NextPage = ({ blogPosts }: any) => {
  const posts = [
    ...blogPosts,
    ...blogPosts,
    ...blogPosts,
    ...blogPosts,
    ...blogPosts,
    ...blogPosts,
  ];
  return (
    <div>
      <Head>
        <title>Blog page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <Container>
            <h2 className="font-bold text-2xl mb-6">
              Ipsam ut aut quaerat fuga et quasi quod et saepe.
            </h2>
            <div className="grid grid-cols-6 gap-6">
              {posts.map((post: any, index: number) => {
                return (
                  <Card
                    key={`${post.id}-${index}`}
                    slug={post.uid}
                    variation={index % 5 === 1 ? "solid" : "default"}
                    post={{
                      image: {
                        url: post.data.image.url,
                        alt: post.data.image.alt,
                      },
                      date: post.data.date,
                      excerpt: post.data.excerpt ? post.data.excerpt : "",
                      title: post.data.title[0].text,
                    }}
                  />
                );
              })}
            </div>
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export default Home;
