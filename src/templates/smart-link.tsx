import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img, { FixedObject, FluidObject } from 'gatsby-image';
import Layout from '../components/Layout';

interface GatsbyImage {
  childImageSharp: {
    fluid: FluidObject;
    fixed: FixedObject;
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
  mainImage: GatsbyImage;
  links: Link[];
  subtitle: string;
  title: string;
}

const LinkComponent = ({ link }) => {
  return (
    <a
      className="columns is-mobile is-centered is-vcentered linkBlock"
      href={link.linkObject.url}
      style={{}}
    >
      <div className="column is-half-mobile">
        <Img
          className="linkImage"
          imgStyle={{ objectFit: 'contain' }}
          fluid={{ ...link.linkObject.linkImage.childImageSharp.fluid }}
        />
      </div>
      <div className="column is-half-mobile">
        <div className="columns is-mobile is-justify-content-flex-end linkTextContainer">
          <div className="column is-half">
            <i className="fas fa-play"></i> PLAY
          </div>
        </div>
      </div>
    </a>
  );
};

export const SmartLinkTemplate = ({
  helmet,
  links,
  mainImage,
  subtitle,
  title,
}: SmartLinkTemplateProps) => {
  return (
    <div
      className="section m-3 p-3"
      style={{
        height: '100%',
      }}
    >
      <div
        className="blurredBackground"
        style={{
          backgroundImage: `url(${mainImage.childImageSharp.fluid.src})`,
        }}
      />
      <div className="container">
        <div className="columns is-centered">
          {helmet || ''}
          <div className="column is-3-desktop is-6-tablet is-12-mobile linkContainer">
            <div className="columns is-centered">
              <div className="column p-0">
                <Img fluid={mainImage.childImageSharp.fluid} />
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column has-text-centered titleBlock">
                <h1 className="is-size-6 has-text-weight-bold mb-2">{title}</h1>
                <h1 className="is-size-7">{subtitle}</h1>
              </div>
            </div>
            {links.map((link, index) => {
              return <LinkComponent link={link} key={index} />;
            })}
          </div>
        </div>
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
        mainImage: GatsbyImage;
      };
    };
  };
}

const SmartLink = ({ data }: SmartLinkProps) => {
  const {
    markdownRemark: {
      frontmatter: { title, subtitle, links, mainImage },
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
        mainImage={mainImage}
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
        mainImage {
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
