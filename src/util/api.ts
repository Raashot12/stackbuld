// api.ts
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const airtableApi = axios.create({
  baseURL: 'https://api.airtable.com/v0/',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
const baseId = 'apphPC5RNwM48sAJz';
const tableName = 'Blog content';
export const fetchBlogs = async () => {
  try {
    const response = await airtableApi.get(`${baseId}/${tableName}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchBlogsDetails = async (param: string | string[]) => {
  try {
    const response = await airtableApi.get(`${baseId}/${tableName}/${param}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deleteBlog = async (param: string | string[]) => {
  try {
    const response = await airtableApi.delete(
      `${baseId}/${tableName}/${param}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
export function useDeleteRecordMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ recordId }: { recordId: string }) => deleteBlog(recordId),
    {
      onSettled: () => {
        // Invalidate the relevant query to trigger a refetch when the record is deleted
        queryClient.invalidateQueries(['items']);
      },
    }
  );
}
