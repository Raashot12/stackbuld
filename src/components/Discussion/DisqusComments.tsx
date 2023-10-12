import { Embed } from 'hyvor-talk-react';
import React from 'react';

const DisqusComments = ({ id }: { id: string | null }) => {
  return (
    <>
      <Embed
        websiteId={9767}
        id={id}
        palette={{
          accent: '#659DBD',
          accentText: '#FFFFFF',
          footerHeader: '#FAFAFA',
          footerHeaderText: '#484848',
          box: '#FFFFFF',
          boxText: '#111111',
          boxLightText: '#AAAAAA',
          backgroundText: '#111111',
        }}
      />
    </>
  );
};

export default DisqusComments;
