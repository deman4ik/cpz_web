import React from "react";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import Head from "next/head";
import Link from "next/link";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SignalsList } from "components/pages/LandingPage/SignalsList";
import { httpLink } from "libs/hoc/withApollo";
import { blogPostsArrayFromServer } from "utils/tempBlogUtils";

const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: httpLink,
    cache: new InMemoryCache()
});

const components = {
    SignalsList: () => (
        <ApolloProvider client={client}>
            <SignalsList />
        </ApolloProvider>
    ),
    Head,
    Link
};

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { components });
    return (
        <div className="wrapper">
            <header>
                <nav>
                    <Link href="/blog">
                        <a> Go back to blog</a>
                    </Link>
                </nav>
            </header>
            <div className="post-header">
                <h1>{frontMatter.title}</h1>
                {frontMatter.description && <p className="description">{frontMatter.description}</p>}
            </div>
            <main>{content}</main>

            <style jsx>{`
                .wrapper {
                    padding: 20px 10px;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .post-header h1 {
                    margin-bottom: 0;
                }

                .post-header {
                    margin-bottom: 2rem;
                }
                .description {
                    opacity: 0.6;
                }
                main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            `}</style>
        </div>
    );
}

export const getStaticProps = async ({ params }) => {
    const { id: postId } = params;

    const source = blogPostsArrayFromServer.find((post) => post.id === postId).markdown;

    const { content, data } = matter(source);

    const mdxSource = await renderToString(content, {
        components,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: []
        },
        scope: data
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    };
};

export const getStaticPaths = async () => {
    const paths = blogPostsArrayFromServer
        // Map the path into the static paths object required by Next.js
        .map((post) => ({
            params: {
                id: post.id
            }
        }));

    return {
        paths,
        fallback: false
    };
};
