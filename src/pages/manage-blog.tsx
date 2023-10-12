/* eslint-disable no-nested-ternary */
import {
  Alert,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Loader,
  Text,
} from '@mantine/core';
import { IconAlertCircle, IconArrowForward } from '@tabler/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from 'util/api';
import EditBlogPost from 'components/Blog/EditBlogPost';
import { child, container } from './blog';

const text = 'Manage blog';
const ManageBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const { data, isFetching, isError } = useQuery(['items'], fetchBlogs);

  useEffect(() => {
    if (!isFetching) {
      if (data.records) {
        setBlogs(data.records);
      }
    }
  }, [data?.records, isFetching]);

  return (
    <Layout pageTitle="Manage blog">
      <Box mt={{ base: 45, lg: 77 }}>
        <Flex
          align="center"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            minHeight: '300px',
            background: '#060b20',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              left: 0,
              height: '125%',
              opacity: 0.3,
              transform: 'translateY(38px)',
              zIndex: -1,
              background:
                'url(https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80) no-repeat scroll center center',
            }}
          ></Box>
          <Container size="xl">
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <Box
                sx={{ fontWeight: 'bold' }}
                fz={{ base: 32, sm: 48 }}
                pt={10}
                mb={12}
              >
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {Array.from(text).map((letter, index) => (
                    <motion.span variants={child} key={index}>
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.div>
              </Box>
              <Flex justify={'center'} align={'center'} columnGap={16} fz={14}>
                <Link href={'/'}>
                  <Text
                    component="div"
                    sx={{
                      cursor: 'pointer',
                      display: 'inline-block',
                      color: 'white',
                      ':hover': {
                        color: '#E16247',
                        fontWeight: 500,
                      },
                    }}
                  >
                    Home
                  </Text>
                </Link>
                <IconArrowForward />
                <Text
                  component="div"
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    display: 'inline-block',
                    ':hover': {
                      color: '#E16247',
                      fontWeight: 500,
                    },
                  }}
                >
                  Manage blog
                </Text>
              </Flex>
            </Box>
          </Container>
        </Flex>
      </Box>
      {isFetching ? (
        <Center my={80}>
          <Loader color="orange" size="md" />
        </Center>
      ) : isError ? (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Error"
          color="red.6"
          variant="outline"
          withCloseButton
        >
          Error Fetching blog data. Please, check your internet.
        </Alert>
      ) : (
        <Container size={'xl'} my={40}>
          <Grid gutter={45}>
            {blogs &&
              blogs.map((value) => {
                return <EditBlogPost key={value?.fields?.id} data={value} />;
              })}
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default ManageBlogPage;
