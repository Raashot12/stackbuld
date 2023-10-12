/* eslint-disable import/no-cycle */
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Grid,
  TextInput,
  useMantineColorScheme,
  Text,
  Center,
  Alert,
  Loader,
  Group,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import {
  IconAlertCircle,
  IconArrowBack,
  IconClock,
  IconSend,
} from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { formats, modules } from 'util/constant';
import { validateForErrors } from 'util/validation';
import { useRouter } from 'next/router';
import { fetchBlogsDetails } from 'util/api';
import { Layout } from 'components/Layout/Layout';

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false;

const EditBlogPostForm = () => {
  const { colorScheme } = useMantineColorScheme();
  const [isSubmitting, setIsubmitting] = useState(false);
  const [dateState, setDatestate] = useState<Date | null>(null);
  const router = useRouter();
  const { data, isFetching, isError } = useQuery(
    ['blog', { id: router.query.slug }],
    () => fetchBlogsDetails(router.query.slug)
  );
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
    content: '',
    caption: '',
    category: '',
    image: '',
    highlight: '',
  });

  const baseId = 'apphPC5RNwM48sAJz';
  const tableName = 'Blog content';
  const endpoint = `https://api.airtable.com/v0/${baseId}/${tableName}/${data?.id}`;
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    'Content-Type': 'application/json',
  };

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    if (
      Object.keys(
        validateForErrors(
          { ...blog, content: code.replace(/<[^>]+>/g, '') },
          setErrors
        )
      ).length === 0
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
        const response = await axios.put(
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
          router.push('/blog');
          setDatestate(null);
          setCode('');
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        Swal.fire(
          `${axiosError.message}. Check time stamp & date`,
          'You clicked the button!',
          'error'
        );
        setIsubmitting(false);
      }
    }
  };
  useEffect(() => {
    if (!isFetching) {
      setBlog({
        writerName: data.fields?.Writer ?? '',
        occupation: data.fields?.Occupation ?? '',
        caption: data.fields?.Caption ?? '',
        category: data.fields?.Category ?? '',
        image: data.fields?.Image ?? '',
        highlight: data.fields?.Highlight ?? '',
      });
      setCode(data.fields?.Content);
    }
  }, [isFetching]);

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
    <Layout pageTitle="Edit blog">
      <Container size="xl" mt={{ base: 60, sm: 80, lg: 140 }}>
        <Group
          spacing={10}
          onClick={() => router.push('/blog')}
          mb={30}
          sx={{ cursor: 'pointer' }}
        >
          <IconArrowBack />
          <Text> Go Back blog</Text>
        </Group>
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
                rightIcon={<IconSend style={{ cursor: 'pointer' }} size={16} />}
              >
                Edit post
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default EditBlogPostForm;
