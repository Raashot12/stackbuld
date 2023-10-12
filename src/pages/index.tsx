import React from 'react';
import { Box, Button, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import { Layout } from 'components/Layout/Layout';
import { IconArrowForward } from '@tabler/icons';

function Homepage() {
  return (
    <Layout pageTitle="Home">
      <Box my={200}>
        <Flex justify={'center'}>
          <Box>
            <Text fw={600} fz={20} mb={20} ta={'center'}>
              Welcome to Stackbuild
            </Text>
            <Flex columnGap={30} wrap={'wrap'} justify={'center'} rowGap={30}>
              <Link href={'/blog'}>
                <Button
                  sx={{
                    background: '#E25D24',
                    ' .mantine-Button-label': {
                      fontSize: 14,
                    },
                  }}
                  style={{
                    height: '40px',
                    padding: '0 20px',
                    borderRadius: '10px',
                  }}
                >
                  Our blogs &nbsp; <IconArrowForward size={16} />{' '}
                </Button>
              </Link>
              <Link href={'/create-blog'}>
                <Button
                  sx={{
                    background: '#E25D24',
                    ' .mantine-Button-label': {
                      fontSize: 14,
                    },
                  }}
                  style={{
                    height: '40px',
                    padding: '0 20px',
                    borderRadius: '10px',
                  }}
                  fw={400}
                  fz={14}
                >
                  Creat post &nbsp; <IconArrowForward size={16} />{' '}
                </Button>
              </Link>
            </Flex>
            <Link href={'/manage-blog'}>
              <Button
                mx={'auto'}
                mt={20}
                sx={{
                  background: '#E25D24',
                  ' .mantine-Button-label': {
                    fontSize: 14,
                  },
                }}
                style={{
                  height: '40px',
                  padding: '0 20px',
                  borderRadius: '10px',
                }}
                fw={400}
                fz={14}
              >
                Manage blog &nbsp; <IconArrowForward size={16} />{' '}
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default Homepage;
