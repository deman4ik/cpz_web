export const blogPostsArrayFromServer = [
    {
        markdown:
            "---\ntitle: Example Post\ndescription: This frontmatter description will appear below the title\n---\nThis is an example post, with a [link](https://nextjs.org) and a React component:\n<SignalsList /> \nThe title and description are pulled from the MDX file and processed using `gray-matter`.\n\nAdditionally, links are rendered using a custom component passed to `next-mdx-remote`.\nGo back [home](/blog).",
        id: "statically-generated-path"
    },
    {
        markdown:
            "---\ntitle: Another example post\ndescription: This frontmatter description will appear below the title\n---\nThis is an example post, with a [link](https://nextjs.org) and an image:\n\n![image](https://1.bp.blogspot.com/-JKoOihNnMnw/XeJ4_5gh3WI/AAAAAAAAIzc/ePy4wIlmazYhULLdV0eRUjk3w6BAt9MLACLcBGAsYHQ/s400/LMAO.jpg) \n\nThe title and description are pulled from the MDX file and processed using `gray-matter`.\n\nAdditionally, links are rendered using a custom component passed to `next-mdx-remote`.\nGo back [home](/blog).",
        id: "another-statically-generated-path"
    }
];
