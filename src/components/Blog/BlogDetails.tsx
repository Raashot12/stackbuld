/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import React from 'react';
import {
  Box,
  useMantineColorScheme,
  Image,
  Flex,
  Text,
  Divider,
  Group,
  Avatar,
} from '@mantine/core';
import DisComments from 'components/Discussion/DisqusComments';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'react-share';

const BgColor = styled(Box as any)`
  & iframe {
    background-color: ${({ theme }) =>
      theme.colorScheme === 'dark' ? '#1A1B1E !important' : 'white !important'};
    color: ${({ theme }) =>
      theme.colorScheme === 'dark' ? '#1A1B1E !important' : 'white !important'};
  }
`;
const BlogDetails = ({ data }: { data: any }) => {
  const { colorScheme } = useMantineColorScheme();
  const {
    Writer,
    Date,
    Time,
    Content,
    Caption,
    Image: BlogImage,
    Highlight,
  } = data.fields;

  const createFullPostMarkup = () => {
    return {
      __html: Content,
    };
  };
  return (
    <>
      <Box mt={90} pb={50} pt={30}>
        <Box>
          <Box sx={{ textAlign: 'center' }} mb={40}>
            <Flex justify={'center'}>
              <Avatar h={65} w={65} radius={'50%'} />
            </Flex>
            <Text
              fz={18}
              lh={'1.5'}
              color={colorScheme === 'dark' ? '#c4c4c4' : '#888'}
              fw={500}
            >
              {Writer}
            </Text>{' '}
            <Group
              align="center"
              sx={{ justifyContent: 'center' }}
              spacing={10}
            >
              <Text
                fz={'0.975em'}
                color={colorScheme === 'dark' ? '#c4c4c4' : '#888'}
                fw={400}
              >
                {Date}
              </Text>
              <Divider
                orientation="vertical"
                size={2}
                color={colorScheme === 'dark' ? '#c4c4c4' : '#888'}
              />
              <Text
                fz={'0.975em'}
                color={colorScheme === 'dark' ? '#c4c4c4' : '#888'}
                fw={400}
              >
                {Time}
              </Text>
            </Group>
          </Box>
          <Box mb={25}>
            <Text
              sx={{ textAlign: 'center' }}
              fz={{ base: 25, sm: 34, md: 40 }}
              lh={'1.2'}
              fw={700}
              color={colorScheme === 'dark' ? '#c4c4c4' : '#051438'}
            >
              {Caption}
            </Text>{' '}
            <Text
              sx={{ textAlign: 'center' }}
              fz={{ base: '1rem', sm: '1.25rem' }}
              mt={10}
              lh={'1.5'}
              fw={300}
              color={colorScheme === 'dark' ? '#c4c4c4' : '#888'}
            >
              {Highlight?.substring(0, 88)}.
            </Text>
          </Box>
          <Image
            src={BlogImage}
            alt={'blog image'}
            sx={{
              '& .mantine-Image-image': {
                borderRadius: '10px',
              },
            }}
          />
        </Box>
        <Box mt={20}>
          <Text
            fz={{ base: '1rem', sm: '1.25rem' }}
            mt={10}
            lh={'1.5'}
            fw={300}
            color={colorScheme === 'dark' ? '#c4c4c4' : '#888'}
            dangerouslySetInnerHTML={createFullPostMarkup()}
          ></Text>
        </Box>

        <Divider orientation="horizontal" mt={40} />
        <Box mt={20}>
          <Flex align={'center'} columnGap={5}>
            <Text
              fz={'0.975em'}
              fw={700}
              color={colorScheme === 'dark' ? '#c4c4c4' : '#888893'}
            >
              Share
            </Text>
            <IoIosShareAlt
              color={colorScheme === 'dark' ? '#c4c4c4' : '#888893'}
            />
          </Flex>
          <Flex mt={20} align="center" columnGap={20}>
            <FacebookShareButton
              url={'https://girls4leadership.org'}
              title={Caption}
              quote={'フェイスブックはタイトルが付けれるようです'}
              hashtag={'#hashtag'}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <BsFacebook cursor={'pointer'} size={20} />
            </FacebookShareButton>
            <TwitterShareButton
              title={Caption}
              url="https://girls4leadership.org/"
              hashtags={['hashtag1', 'hashtag2']}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <BsTwitter cursor={'pointer'} size={20} />
            </TwitterShareButton>
            <LinkedinShareButton
              title={Caption}
              url="https://girls4leadership.org/"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaLinkedin cursor={'pointer'} size={20} />
            </LinkedinShareButton>
          </Flex>
        </Box>
        <BgColor
          size={'xl'}
          mt={60}
          sx={{
            background:
              colorScheme === 'dark'
                ? '#1A1B1E !important'
                : '#fffff !important',
          }}
        >
          <DisComments id={data.id} />
        </BgColor>
      </Box>
    </>
  );
};

export default BlogDetails;
