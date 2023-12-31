/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Group,
  useMantineColorScheme,
  Container,
  ActionIcon,
  Burger,
  Stack,
  Collapse,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { IconSearch } from '@tabler/icons';
import { ColorSchemeToggle } from 'components/ColorSchemeToggle';

const CustomLink = styled(Link)`
  font-weight: 500;
  line-height: 90px;
  &.active {
    color: #e1621b;
    font-weight: 600;
  }

  &.not-active:hover {
    color: #e1621b;
    font-weight: 600;
    transition: all ease-in-out 0.5s;
  }
`;
const MobileLink = styled(Link)`
  font-weight: 500;
  &.active {
    color: #e1621b;
    font-weight: 600;
  }

  &.not-active:hover {
    color: #e1621b;
    font-weight: 600;
    transition: all ease-in-out 0.5s;
  }
`;

const HeaderComponent = styled(Box as any)<{
  scrollDirection: string;
  scrollheight: number;
}>`
  box-shadow: 0 0 22px rgb(0 0 0 / 10%);
  &.global-nav--sticky {
    position: fixed;
    width: 100%;
    top: ${({ scrollDirection }) =>
      scrollDirection === 'UP' ? `${7}px` : `${0}px`};
    background: ${({ theme }) =>
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white};
    box-shadow: 0 0 22px rgb(0 0 0 / 10%);
    transition: background 500ms ease, -webkit-transform 500ms ease;
    -o-transition: transform 500ms ease, background 500ms ease;
    transition: transform 500ms ease, background 500ms ease;
    transition: transform 500ms ease, background 500ms ease,
      -webkit-transform 500ms ease;
  }
  position: ${({ scrollheight }) => (scrollheight <= 0 ? `fixed` : `absolute`)};

  width: 100%;
  top: 0;
  z-index: 100;
  background: ${({ theme }) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white};
`;

const navMenu = [
  {
    pathName: 'Home',
    route: '/',
    id: 1,
  },
  {
    pathName: 'Blog',
    route: '/blog',
    id: 4,
  },
];

function NavbarMenu() {
  const { colorScheme } = useMantineColorScheme();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');
  const [opened, setOpened] = useState(false);
  const { pathname } = useRouter();
  useEffect(() => {
    const scrollableElement = document.body;
    function checkScrollDirectionIsUp(event: any) {
      if (event.wheelDelta) {
        return event.wheelDelta > 0;
      }
      return event.deltaY < 0;
    }
    function checkScrollDirection(event: any) {
      if (checkScrollDirectionIsUp(event)) {
        setScrollDirection('UP');
      } else {
        setScrollDirection('Down');
      }
    }

    function updateScrollHeight() {
      setScrollHeight(window.scrollY);
    }
    // Attach event listener for scroll events
    window.addEventListener('scroll', updateScrollHeight);
    scrollableElement.addEventListener('wheel', checkScrollDirection);
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', updateScrollHeight);
    };
  }, [scrollHeight]);

  return (
    <>
      <HeaderComponent
        className={scrollHeight >= 140 ? 'global-nav--sticky' : ''}
        position={scrollDirection}
        scrollheight={scrollHeight}
      >
        <Container size="xl">
          <Flex align={'center'} justify={'space-between'} py={3}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Text fz={19} fw={700} fs={'italic'}>
                StackBuld
              </Text>
            </Link>

            <Box
              sx={{
                display: 'flex',
                columnGap: 25,
                '@media (max-width:900px)': {
                  display: 'none',
                },
              }}
            >
              {navMenu.map((value) => {
                return (
                  <React.Fragment key={value.id}>
                    <CustomLink
                      href={value.route}
                      className={
                        pathname === '/' && value.route === '/'
                          ? 'active'
                          : pathname.includes(value.route) &&
                            value.route !== '/'
                          ? 'active'
                          : 'not-active'
                      }
                    >
                      {value.pathName}
                    </CustomLink>
                  </React.Fragment>
                );
              })}
            </Box>
            <Box
              sx={{
                display: 'flex',
                columnGap: 18,
                '@media (max-width:900px)': {
                  display: 'none',
                },
              }}
            >
              <ActionIcon
                size="lg"
                variant="outline"
                color={colorScheme === 'dark' ? 'brand.7' : 'brand.3'}
                title="Toggle color scheme"
                sx={{
                  '&:hover': {
                    background: 'none',
                  },
                }}
              >
                <IconSearch fontWeight={400} cursor={'pointer'} size="18" />
              </ActionIcon>
              <ColorSchemeToggle />
            </Box>
            <Burger
              color="#E25D24"
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              sx={{
                '@media (min-width:901px)': {
                  display: 'none',
                },
              }}
            />
          </Flex>
        </Container>
        <Collapse in={opened} pt={20}>
          <Box
            sx={{
              '@media (min-width:901px)': {
                display: 'none',
              },
              width: '100%',
            }}
            px={16}
          >
            <Stack spacing={25}>
              {navMenu.map((value) => {
                return (
                  <React.Fragment key={value.id}>
                    <MobileLink
                      href={value.route}
                      className={
                        pathname === '/' && value.route === '/'
                          ? 'active'
                          : pathname.includes(value.route) &&
                            value.route !== '/'
                          ? 'active'
                          : 'not-active'
                      }
                    >
                      {value.pathName}
                    </MobileLink>
                  </React.Fragment>
                );
              })}
            </Stack>
            <Group spacing={18} mt={20} pb={20}>
              <ActionIcon
                size="lg"
                variant="outline"
                color={colorScheme === 'dark' ? 'brand.7' : 'brand.3'}
                title="Toggle color scheme"
                sx={{
                  '&:hover': {
                    background: 'none',
                  },
                }}
              >
                <IconSearch fontWeight={400} cursor={'pointer'} size="18" />
              </ActionIcon>
              <ColorSchemeToggle />
            </Group>
          </Box>
        </Collapse>
      </HeaderComponent>
    </>
  );
}

export default NavbarMenu;
