import Head from 'next/head';
import React from 'react';

type HeadTitleProps = {
  title: string;
};

const HeadTitle = ({ title }: HeadTitleProps) => {
  return (
    <Head>
      <title>{`StackBuld - ${title}`}</title>
    </Head>
  );
};

export default HeadTitle;
