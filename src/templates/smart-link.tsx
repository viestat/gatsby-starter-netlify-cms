import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img, { FixedObject, FluidObject } from 'gatsby-image';
import Layout from '../components/Layout';

interface GatsbyImage {
  childImageSharp: {
    fluid: FluidObject | FluidObject[];
    fixed: FixedObject | FixedObject[];
  };
}

interface Link {
  linkObject: {
    url: string;
    linkImage: GatsbyImage;
  };
}

interface SmartLinkTemplateProps {
  helmet?: React.ReactNode;
  pageImage: GatsbyImage;
  links: Link[];
  subtitle: string;
  title: string;
}

// const LinkComponent = ({ link }) => {
//   return (
//     <a
//       className="columns is-mobile is-centered"
//       src={link.url}
//       style={{
//         maxHeight: 78,
//       }}
//     >
//       <div className="column is-offset-4 is-4">
//         <Img fluid={link.link.image.childImageSharp.fluid} />
//       </div>
//       <div className="column is-2">
//         <p>Play</p>
//       </div>
//     </a>
//   );
// };

export const SmartLinkTemplate = ({
  helmet,
  links,
  pageImage,
  subtitle,
  title,
}: SmartLinkTemplateProps) => {
  console.log(links[0].linkObject, 'inks');
  return (
    <div className="section" style={{ backgroundColor: 'black' }}>
      <div className="container">
        <div className="columns is-centered">
          {helmet || ''}
          <div className="column is-4">
            <Img fluid={pageImage.childImageSharp.fluid} />
          </div>
        </div>
        <a
          className="columns is-mobile is-centered"
          href={links[0].linkObject.url}
          style={{}}
        >
          <div className="column is-1">
            <Img fluid={links[0].linkObject.linkImage.childImageSharp.fluid} />
          </div>
          <div className="column is-3">
            <div className="columns">
              <span className="icon">
                <i className="fas fa-play"></i>
              </span>
              <p>Play</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

interface SmartLinkProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        subtitle: string;
        links: Link[];
        pageImage: GatsbyImage;
      };
    };
  };
}

const SmartLink = ({ data }: SmartLinkProps) => {
  const {
    markdownRemark: {
      frontmatter: { title, subtitle, links, pageImage },
    },
  } = data;
  return (
    <Layout>
      <SmartLinkTemplate
        helmet={
          <Helmet titleTemplate="%s | Links">
            <title>{`${title}`}</title>
            <meta name="description" content={`${subtitle}`} />
          </Helmet>
        }
        title={title}
        subtitle={subtitle}
        pageImage={pageImage}
        links={links}
      />
    </Layout>
  );
};

export default SmartLink;

export const pageQuery = graphql`
  query SmartLinkByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        subtitle
        links {
          linkObject {
            url
            linkImage {
              childImageSharp {
                fluid(maxHeight: 30, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        pageImage {
          childImageSharp {
            fluid(maxWidth: 745, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
