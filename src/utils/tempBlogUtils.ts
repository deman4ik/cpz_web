export const blogPostsArrayFromServer = [
    {
        markdown:
            "---\ntitle: Example Post\ndescription: This frontmatter description will appear below the title\n---\nThis is an example post, with a [link](https://nextjs.org) and a React component:\n<SignalsList />\nThe title and description are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.\nGo back [home](/).",
        id: "statically-generated-path"
    },
    {
        markdown:
            "---\ntitle: Another example post\ndescription: This frontmatter description will appear below the title\n---\nThis is an example post, with a [link](https://nextjs.org) and a React component:\n<SignalsList />\nThe title and description are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.\nGo back [home](/).",
        id: "another-statically-generated-path"
    }
];
