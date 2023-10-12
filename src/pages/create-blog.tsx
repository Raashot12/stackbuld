import React, { useRef, useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import AOSInit from 'components/Shared/AOSInit';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowForward, IconClock, IconSend } from '@tabler/icons';
import Swal from 'sweetalert2';
import 'aos/dist/aos.css';
import { validateForErrors } from 'util/validation';
import axios, { AxiosError } from 'axios';
import { Layout } from 'components/Layout/Layout';
import { DateInput, TimeInput } from '@mantine/dates';
import moment from 'moment';
import { formats, modules } from 'util/constant';
import { child, container } from './blog';
import 'react-quill/dist/quill.snow.css';

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false;

const text = 'Create blog';
const CreateBlog = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isSubmitting, setIsubmitting] = useState(false);
  const [dateState, setDatestate] = useState<Date | null>(null);
  const [code, setCode] = useState('');
  const ref = useRef<HTMLInputElement>();
  const [blog, setBlog] = useState({
    writerName: '',
    occupation: '',
    caption: '',
    category: '',
    image: '',
    highlight: '',
  });
  const [errors, setErrors] = useState({
    writerName: '',
    occupation: '',
    content: code,
    caption: '',
    category: '',
    image: '',
    highlight: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog({
      ...blog,
      [e.target?.name]: e.target.value,
    });
  };
  const handleProcedureContentChange = (content) => {
    setCode(content);
  };
  const baseId = 'apphPC5RNwM48sAJz';
  const tableName = 'Blog content';
  const endpoint = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    if (
      Object.keys(validateForErrors({ ...blog, content: code }, setErrors))
        .length === 0
    ) {
      setIsubmitting(true);
      e.preventDefault();

      const serializedData = {
        Writer: blog.writerName,
        Occupation: blog.occupation,
        Content: code,
        Caption: blog.caption,
        Category: blog.category,
        Highlight: blog.highlight,
        Date: moment(dateState).format('LL'),
        Image: blog.image,
        Time: ref.current.value,
      };

      try {
        const response = await axios.post(
          endpoint,
          { fields: serializedData },
          { headers }
        );

        if (response.status === 200) {
          Swal.fire(
            'Submitted Successfully!',
            'You clicked the button!',
            'success'
          );
          setIsubmitting(false);
          setBlog({
            writerName: '',
            occupation: '',
            caption: '',
            category: '',
            image: '',
            highlight: '',
          });
          setDatestate(null);
          setCode('');
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        Swal.fire(`${axiosError.message}`, 'You clicked the button!', 'error');
        setIsubmitting(false);
      }
    }
  };
  AOSInit({
    disable: false,
  });
  return (
    <Layout pageTitle="Create blog">
      <Box mt={77}>
        {' '}
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
                  Create blog
                </Text>
              </Flex>
            </Box>
          </Container>
        </Flex>
        <Divider
          color={
            colorScheme === 'dark'
              ? 'rgb(217, 226, 239, 0.2)'
              : 'rgb(217, 226, 239, 0.5)'
          }
        />
        <Container size="xl">
          <Box
            sx={{ textAlign: 'center' }}
            py={{ base: 40, sm: 60, lg: 80 }}
            w={{ base: '100%', sm: '80%' }}
            mx={'auto'}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <Text
              sx={{ fontWeight: 700, lineHeight: '29px' }}
              fz={{ base: 20, sm: 24, md: 29 }}
              mb={20}
            >
              Directly be a content writer at StackBuld
            </Text>
            <Text
              sx={{ fontWeight: 400, lineHeight: '29px' }}
              fz={{ base: 20, md: 30, lg: 30 }}
              lh={{ base: '36px', sm: '46px' }}
            >
              Unlock the power of your words and ideas. Share your unique
              perspective with the world. Start crafting your own blog post
              today and let your voice be heard!
            </Text>
          </Box>
          <Box component="form" pb={50}>
            <Grid gutter={25}>
              <Grid.Col sm={6}>
                <TextInput
                  withAsterisk
                  placeholder="Rasheed Iskilu"
                  label="Writer Name"
                  name={'writerName'}
                  onChange={handleChange}
                  error={errors?.writerName}
                  value={blog.writerName}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TextInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  withAsterisk
                  placeholder="Technical Writer"
                  label="Occupation"
                  name={'occupation'}
                  onChange={handleChange}
                  error={errors?.occupation}
                  value={blog.occupation}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TextInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  withAsterisk
                  placeholder="Business, Travel"
                  label="Category"
                  name={'category'}
                  error={errors?.category}
                  onChange={handleChange}
                  value={blog.category}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TextInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  withAsterisk
                  placeholder="https://images.unsplash.com/photo"
                  label="Blog image"
                  name={'image'}
                  error={errors?.image}
                  onChange={handleChange}
                  value={blog.image}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TextInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  withAsterisk
                  label="Caption"
                  placeholder="Your most unhappy customers are your greatest source of learning."
                  name={'caption'}
                  error={errors?.caption}
                  onChange={handleChange}
                  value={blog.caption}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TextInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  withAsterisk
                  label="Blog highlight"
                  placeholder="Far far away, behind the word mountains, far from the countries Vokalia and Consonantial."
                  name={'highlight'}
                  error={errors?.highlight}
                  onChange={handleChange}
                  value={blog.highlight}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TextInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <DateInput
                  label="Date stamp"
                  placeholder="October 10, 2023"
                  name={'date'}
                  value={dateState}
                  onChange={setDatestate}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></DateInput>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TimeInput
                  label="Time stamp"
                  ref={ref}
                  rightSection={
                    <ActionIcon onClick={() => ref.current.showPicker()}>
                      <IconClock size="1rem" stroke={1.5} />
                    </ActionIcon>
                  }
                  name={'time'}
                  sx={{
                    '&.mantine-Input-input:focus-within': {
                      borderColor: '#aeadad',
                    },
                    '& .mantine-Input-input:focus': {
                      borderColor: '#c4c4c4',
                    },
                    '& .mantine-Input-input': {
                      background: colorScheme === 'dark' ? '#242629' : 'none',
                      color: colorScheme === 'dark' ? '#c4c4c4' : '#051438',
                      fontWeight: 400,
                    },
                  }}
                ></TimeInput>
              </Grid.Col>
              <Grid.Col>
                <ReactQuill
                  theme="snow"
                  name="content"
                  value={code}
                  onChange={handleProcedureContentChange}
                  modules={modules}
                  formats={formats}
                />
                <Text sx={{ color: 'red', fontSize: '12px', fontWeight: 500 }}>
                  {errors?.content}
                </Text>
              </Grid.Col>
              <Grid.Col
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={handleFormSubmit}
                  loading={isSubmitting}
                  sx={{
                    '&.mantine-Button-root': {
                      background: '#E25D24',
                      height: 40,
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
                  Create post
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default CreateBlog;
