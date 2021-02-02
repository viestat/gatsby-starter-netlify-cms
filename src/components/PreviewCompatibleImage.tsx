import * as React from 'react';
import Img from 'gatsby-image';

interface Image {
  childImageSharp: {
    fluid: any;
  };
}

interface PreviewCompatibleImageProps {
  imageInfo: {
    alt: string;
    childImageSharp: Image['childImageSharp'];
    image: Image | string;
    style: object;
  };
}

const PreviewCompatibleImage = ({ imageInfo }: PreviewCompatibleImageProps) => {
  const imageStyle = { borderRadius: '5px' };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (typeof image === 'string') {
    return <img style={imageStyle} src={image} alt={alt} />;
  }

  if (image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    );
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }

  return null;
};

export default PreviewCompatibleImage;
