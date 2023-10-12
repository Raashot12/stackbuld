/* eslint-disable no-bitwise */
import { Dispatch, SetStateAction } from 'react';

function isValidUrl(url: string): boolean {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}
export const validateForErrors = (
  fieldsToCheckForError: {
    [key: string]: string;
  },
  setErrorsState: Dispatch<SetStateAction<{ [key: string]: string }>>
) => {
  const errors: { [key: string]: string } = {};
  // Your validation logic here
  if (fieldsToCheckForError.writerName === '') {
    errors.writerName = 'Writer name is required';
  }

  if (fieldsToCheckForError.occupation === '') {
    errors.occupation = 'Occupation field is required';
  }
  if (
    String(fieldsToCheckForError.category) === '' ||
    fieldsToCheckForError.category.length <= 0
  ) {
    errors.category = 'Category field is required';
  }
  if (fieldsToCheckForError.content === '') {
    errors.content = 'Content field is required';
  }
  if (fieldsToCheckForError.caption === '') {
    errors.caption = 'Caption field is required';
  }
  if (fieldsToCheckForError.highlight === '') {
    errors.highlight = 'Highlight field is required';
  }
  if (fieldsToCheckForError.image === '') {
    errors.image = 'Image field is required';
  } else if (!isValidUrl(fieldsToCheckForError.image)) {
    errors.image = 'Image does not have a valid url';
  }

  setErrorsState(errors);
  return errors;
};
