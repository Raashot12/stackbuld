import { Button, Flex, Popover, Stack, Text } from '@mantine/core';
import React from 'react';
import IconConfirmDialog from 'components/Icons/IconConfirmDialog';

export type ConfirmationDialogPopOverProps = {
  popOverText?: string | undefined;
  openPopOver?: boolean | undefined;
  closePopOver: (args: boolean) => void;
  handleChange: () => void;
  targetButton: React.ReactElement | undefined;
};

const ConfirmationDialogPopOver: React.FC<ConfirmationDialogPopOverProps> = ({
  targetButton,
  openPopOver,
  closePopOver,
  handleChange,
  popOverText,
}) => {
  return (
    <Popover width={300} position="top" shadow="md" opened={openPopOver}>
      <Popover.Target>{targetButton}</Popover.Target>
      <Popover.Dropdown style={{ backgroundColor: '#EDF0F8' }}>
        <Stack
          style={{
            gap: '0.8rem',
          }}
        >
          <Flex gap={30} justify="space-between" align="center" direction="row">
            <Text
              style={{
                color: '#051438',
                fontWeight: 600,
                margin: '0',
              }}
            >
              Confirmation
            </Text>
            <IconConfirmDialog />
          </Flex>
          <Stack
            style={{
              backgroundColor: '#FFFFFF',
              height: 'fit-content',
              gap: '0.3rem',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <Text
              style={{
                height: '1rem',
                color: '#051438',
                fontSize: '0.8rem',
                fontWeight: 500,
                margin: '0',
              }}
            >
              {popOverText}
            </Text>
            <Text
              style={{
                height: '1rem',
                color: '#677597',
                fontSize: '0.8rem',
                fontWeight: 500,
                margin: '0',
              }}
            >
              Do you with to proceed?
            </Text>
          </Stack>
          <Flex
            mih={30}
            gap={10}
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button
              compact
              size="xs"
              styles={() => ({
                label: {
                  fontSize: '0.85rem',
                },
              })}
              style={{
                height: '2rem',
                backgroundColor: '#FFFFFF',
                color: '#0B0C7D',
                padding: '0 20px',
              }}
              onClick={() => closePopOver(false)}
            >
              Close
            </Button>
            <Button
              size="xs"
              bg={'#D47400'}
              style={{ height: '2rem' }}
              styles={() => ({
                label: {
                  fontSize: '0.85rem',
                },
              })}
              onClick={() => handleChange()}
            >
              Proceed
            </Button>
          </Flex>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ConfirmationDialogPopOver;
