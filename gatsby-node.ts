import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { fmImagesToRelative } from 'gatsby-remark-relative-images';

export interface Node {
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    templateKey: string;
  };
}

interface QueryResult {
  allMarkdownRemark: {
    edges: {
      node: Node;
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  const result = await graphql<QueryResult>(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    throw new Error('ERROR: Could not fetch posts on build');
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((edge) => {
    const id = edge.node.id;
    const templatePath = path.resolve(
      `src/templates/${edge.node.frontmatter.templateKey}.tsx`,
    );

    createPage({
      path: edge.node.fields.slug,
      component: templatePath,
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;
  // convert image paths for gatsby images
  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
