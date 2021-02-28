import * as React from 'react';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { SmartLinkTemplate } from '../../templates/smart-link';

const SmartLinkPreview = ({
  entry,
}: PreviewTemplateComponentProps) => {
  return (
    <SmartLinkTemplate
      title={entry.getIn(['data', 'title'])}
      subtitle={entry.getIn(['data', 'subtitle'])}
      mainImage={entry.getIn(['data', 'mainImage'])}
      links={entry.getIn(['data', 'links']).toJS()}
    />
  );
};

export default SmartLinkPreview;
