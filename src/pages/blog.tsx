import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  TextInput,
  Text,
} from '@mantine/core';
import { Layout } from 'components/Layout/Layout';
import Link from 'next/link';
import React from 'react';
import { IconArrowForward, IconSend } from '@tabler/icons';
import Blog from 'components/Blog/Blog';
import { motion } from 'framer-motion';

export const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};
export const child = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
      duration: 5,
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
  hidden: {
    opacity: 0,
    x: -20,
    y: 10,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
      repeat: Infinity,
    },
  },
};
const text = 'Our Blog';
const BlogPage = () => {
  return (
    <Layout pageTitle="Blog">
      <Box mt={77}>
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
                'url(https://res.cloudinary.com/rashot/image/upload/v1680580320/arnel-hasanovic-MNd-Rka1o0Q-unsplash_tr1etx.webp) no-repeat scroll center center',
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
                    ':hover': {
                      color: '#E16247',
                      fontWeight: 500,
                    },
                  }}
                >
                  Blog
                </Text>
              </Flex>
            </Box>
          </Container>
        </Flex>
        <Blog />
        <Container size={'xl'}>
          <Box
            px={{ base: 20, sm: 30, md: 40, lg: 60 }}
            py={30}
            sx={{ background: '#F8F9FA', borderRadius: 4 }}
            my={50}
          >
            <Text
              fz={{ base: 20, sm: 24, md: 28 }}
              mb={16}
              fw={600}
              color="#051438"
            >
              Subscribe to newsletter
            </Text>
            <Grid>
              <Grid.Col sm={8}>
                <TextInput
                  placeholder="Enter your mail"
                  sx={{
                    '.mantine-TextInput-input': {
                      background: 'white',
                      color: '#051438',
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <Button
                  fullWidth
                  sx={{
                    '&.mantine-Button-root': {
                      background: '#E25D24',
                    },
                    '& .mantine-Button-label': {
                      fontSize: 16,
                      fontWeight: 600,
                    },
                    borderRadius: '10px',
                  }}
                  rightIcon={
                    <IconSend style={{ cursor: 'pointer' }} size={16} />
                  }
                >
                  SUBSCRIBE
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default BlogPage;
