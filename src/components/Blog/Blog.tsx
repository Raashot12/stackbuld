/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Text,
  Container,
  Group,
  Image,
  Grid,
  Flex,
  Center,
  Loader,
  Alert,
  Avatar,
} from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import React, { useRef } from 'react';
import { usePagination } from 'hooks/usePagination';
import Pagination from 'components/Pagination';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from 'util/api';
import { IconAlertCircle } from '@tabler/icons';
import Popular from './Popular';

const Blog = () => {
  const { data, isFetching, isError } = useQuery(['items'], fetchBlogs);

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const matches = useMediaQuery('(max-width: 991.5px)');

  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({
      itemsPerPage: matches ? 4 : 3,
      data: (data && data?.records) || [],
      startFrom: 1,
    });

  if (isFetching) {
    return (
      <Center mt={50}>
        <Loader color="orange" size="md" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Error"
        color="red.6"
        variant="outline"
        withCloseButton
      >
        Error Fetching blog data. Please, check your internet.
      </Alert>
    );
  }
  return (
    <Box pt={40}>
      <Text
        ta={'center'}
        fz={{ base: 20, lg: 25 }}
        fw={{ base: 700 }}
        mb={'2.5rem'}
      >
        Explore a World of Wisdom and Creativity: Unleashing Inspiration, One
        Insightful Blog Post at a Time on StackBuld
      </Text>
      <Container size={'xl'} sx={{ overflowY: 'hidden', overflowX: 'hidden' }}>
        <Carousel
          mx="auto"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          withControls={false}
          withIndicators={true}
          height={'auto'}
          styles={{
            indicator: {
              width: 12,
              height: 4,
              transition: 'width 250ms ease',

              '&[data-active]': {
                width: 40,
              },
            },
          }}
        >
          {data &&
            data.records?.map((value) => {
              return (
                <React.Fragment key={value.id}>
                  <Carousel.Slide
                    sx={{
                      '.mantine-Carousel-viewport': {
                        overflowY: 'hidden',
                      },
                    }}
                  >
                    <Link href={`/blog/${value.id}`}>
                      <Flex
                        align={'center'}
                        columnGap={50}
                        rowGap={20}
                        wrap={{ base: 'wrap', md: 'nowrap' }}
                      >
                        <Box>
                          <img
                            src={value.fields.Image}
                            alt={value.title}
                            loading="eager"
                            style={{
                              maxWidth: '100%',
                              height: '100%',
                              width: '100%',
                              borderRadius: 7,
                            }}
                          />
                        </Box>
                        <Box>
                          <Text>
                            <span style={{ fontWeight: '600' }}>
                              {value.fields.Category}
                            </span>{' '}
                            <span
                              style={{
                                color: ' #999',
                                fontWeight: 400,
                                fontSize: 14,
                              }}
                            >
                              -- {value.fields.Date}
                            </span>
                          </Text>
                          <Text
                            fz={{ base: 30, md: 40 }}
                            fw={700}
                            lh={1.2}
                            mt={15}
                            sx={{ whiteSpace: 'normal' }}
                          >
                            {value.fields.Caption}
                          </Text>
                          <Text
                            fz={14}
                            fw={400}
                            lh={1.5}
                            mt={15}
                            color="#999"
                            sx={{ whiteSpace: 'normal' }}
                          >
                            {value.fields.Highlight}
                          </Text>
                          <Flex
                            mt={20}
                            id="blogs"
                            align={'center'}
                            columnGap={16}
                          >
                            <Avatar h={45} w={45} />
                            <Box>
                              <Text fw={700} lh={1}>
                                {value.fields.Writer}
                              </Text>
                              <Text fw={14} color="#888">
                                {value.fields.Occupation}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>
                    </Link>
                  </Carousel.Slide>
                </React.Fragment>
              );
            })}
        </Carousel>

        <Box mt={50}>
          <Grid gutter={45}>
            {slicedData &&
              slicedData.map((value) => {
                return (
                  <Grid.Col
                    xs={12}
                    sm={6}
                    md={4}
                    key={value.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Link href={`/blog/${value.id}`}>
                      <Image
                        src={value.fields.Image}
                        alt={value.title}
                        sx={{
                          '& .mantine-Image-image': {
                            borderRadius: '7px',
                            height: '250px !important',
                          },
                        }}
                      />
                      <Box mt={25}>
                        <Text>
                          <span style={{ fontWeight: '600' }}>
                            {value.fields.Category}
                          </span>{' '}
                          <span
                            style={{
                              color: ' #999',
                              fontWeight: 400,
                              fontSize: 14,
                            }}
                          >
                            -- {value.fields.Date}
                          </span>
                        </Text>
                        <Text
                          fz={{ base: 18 }}
                          fw={700}
                          lh={1.2}
                          mt={14}
                          sx={{ whiteSpace: 'normal' }}
                        >
                          {value.fields.Caption}
                        </Text>
                        <Text
                          fz={14}
                          fw={400}
                          lh={1.5}
                          mt={15}
                          color="#999"
                          sx={{ whiteSpace: 'normal' }}
                        >
                          {value.fields.Highlight?.substring(0, 88)}.
                        </Text>
                        <Group mt={20}>
                          <Avatar h={45} w={45} radius={'50%'} />
                          <Box>
                            <Text fw={700} lh={1}>
                              {value.fields.Writer}
                            </Text>
                            <Text fw={14} color="#888">
                              {value.fields.Occupation}
                            </Text>
                          </Box>
                        </Group>
                      </Box>
                    </Link>
                  </Grid.Col>
                );
              })}
          </Grid>
        </Box>
        <Flex justify="center" mt={39}></Flex>
        <Pagination
          idToClampTo="blogs"
          pagination={pagination}
          prevPage={prevPage}
          nextPage={nextPage}
          changePage={changePage}
        />
      </Container>
      <Box>
        <Popular data={data.records} />
      </Box>
    </Box>
  );
};

export default Blog;
