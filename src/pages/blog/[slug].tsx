/* eslint-disable prefer-const */
import { Alert, Center, Container, Loader } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import BlogDetails from 'components/Blog/BlogDetails';
import { Layout } from 'components/Layout/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import { fetchBlogsDetails } from 'util/api';

const BlogInformation = () => {
  const router = useRouter();
  const { data, isFetching, isError } = useQuery(
    ['blog', { id: router.query.slug }],
    () => fetchBlogsDetails(router.query.slug)
  );
  if (isFetching) {
    return (
      <Layout pageTitle="Blog Details">
        <Center mt={50} mih={'80vh'}>
          <Loader color="orange" size="md" />
        </Center>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout pageTitle="Blog Details">
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error"
          color="red.6"
          variant="outline"
          withCloseButton
        >
          Error Fetching blog data. Please, check your internet.
        </Alert>
      </Layout>
    );
  }
  return (
    <Layout pageTitle="Blog Details">
      <Container size="md">
        <BlogDetails data={data} />
      </Container>
    </Layout>
  );
};

export default BlogInformation;
