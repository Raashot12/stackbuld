/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Text,
  Image,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons';
import IconDeleteBtn from 'components/Icons/IconDeleteBtn';
import ConfirmationDialogPopOver from 'components/Shared/ConfirmationDialogPopOver';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteRecordMutation } from 'util/api';
import { Article } from 'types/merchSection';
import { useRouter } from 'next/router';

const EditBlogPost = ({ data }: { data: Article }) => {
  const [openedConfirmDialog, setOpenedConfirmDialog] =
    useState<boolean>(false);
  const deleteMutation = useDeleteRecordMutation();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = await deleteMutation.mutateAsync({
        recordId: data?.id,
      });
      if (result) {
        Swal.fire(
          'Post deleted successfully!',
          'You clicked the button!',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error occurred during deleting!Please try again',
        'You clicked the button!',
        'error'
      );
    }
  };
  return (
    <Grid.Col xs={12} sm={6} md={4} pos={'relative'}>
      <Box top={20} pos={'absolute'} sx={{ zIndex: 10 }}>
        <Button
          onClick={() => router.push(`/edit-blog-post/${data?.id}`)}
          h={20}
          sx={{
            background: '#E25D24',
            ' .mantine-Button-label': {
              fontSize: 14,
              fontWeight: 500,
            },
          }}
          rightIcon={<IconEdit width={14} height={14} />}
        >
          Edit
        </Button>
      </Box>
      <Image
        src={data.fields.Image}
        alt={'Post picture'}
        sx={{
          '& .mantine-Image-image': {
            borderRadius: '7px',
            height: '250px !important',
          },
        }}
      />
      <Box mt={25}>
        <Text>
          <span style={{ fontWeight: '600' }}>{data.fields.Category}</span>{' '}
          <span
            style={{
              color: ' #999',
              fontWeight: 400,
              fontSize: 14,
            }}
          >
            -- {data.fields.Date}
          </span>
        </Text>
        <Text
          fz={{ base: 18 }}
          fw={700}
          lh={1.2}
          mt={14}
          sx={{ whiteSpace: 'normal' }}
        >
          {data.fields.Caption}
        </Text>
        <Text
          fz={14}
          fw={400}
          lh={1.5}
          mt={15}
          color="#999"
          sx={{ whiteSpace: 'normal' }}
        >
          {data.fields.Highlight?.substring(0, 88)}.
        </Text>
        <Flex
          justify={'space-between'}
          align={'center'}
          mt={20}
          sx={{ cursor: 'pointer', position: 'relative' }}
        >
          <Group>
            <Avatar h={45} w={45} radius={'50%'} />
            <Box>
              <Text fw={700} lh={1}>
                {data.fields.Writer}
              </Text>
              <Text fw={14} color="#888">
                {data.fields.Occupation}
              </Text>
            </Box>
          </Group>
          <ConfirmationDialogPopOver
            popOverText={`You are about to delete this item`}
            openPopOver={openedConfirmDialog}
            closePopOver={(arg: boolean) =>
              !arg && setOpenedConfirmDialog(false)
            }
            handleChange={handleDelete}
            targetButton={
              <IconDeleteBtn handleClick={() => setOpenedConfirmDialog(true)} />
            }
          />
        </Flex>
      </Box>
      {/* <EditModal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        colorMode={colorScheme === 'dark' ? '#242629' : '#EDF0F8'}
        withCloseButton={false}
        fullScreen
        centered
        title={
          <Flex justify={'space-between'} align={'center'}>
            <Stack spacing={0}>
              <Text fz={18} fw={600}>
                Edith Blog Post
              </Text>
              <Text fz={14} fw={500}>
                You are at liberty to edit and update your content.
              </Text>
            </Stack>
            <CloseIcon onclick={() => setOpenModal(false)} />
          </Flex>
        }
      >
        <EditBlogPostForm data={data} setOpenModal={setOpenModal} />
      </EditModal> */}
    </Grid.Col>
  );
};

export default EditBlogPost;
