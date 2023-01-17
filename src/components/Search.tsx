import { Carousel } from '@mantine/carousel';
import {
  Button,
  CloseButton,
  Col,
  Grid,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { Search as S } from 'tabler-icons-react';
import { medias } from '../constants/routes';
import { useMoods } from '../hooks/mediasHooks';
import { useColorSchemeLocalStorage } from '../hooks/useColorSchemeLocalStorage';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';

const Search = () => {
  const { colorScheme } = useColorSchemeLocalStorage();
  const moods = useMoods();
  const { navigate, clearSearchParam, searchParams } = useNavigateWithQuery();

  const [searchBarValue, setSearchBarValue] = useState(searchParams.q ?? '');

  const handleSearch = () => {
    searchBarValue
      ? navigate(medias.path, { q: searchBarValue })
      : clearSearchParam('q');
  };

  const handleClearSearch = () => {
    setSearchBarValue('');
    clearSearchParam('q');
  };

  const handleMoodClick = (mood: string) => {
    mood === searchParams.mood
      ? clearSearchParam('mood')
      : navigate(medias.path, { mood });
  };

  return (
    <div>
      <TextInput
        radius="xl"
        size="lg"
        styles={() => ({
          root: {
            position: 'relative',
          },
          rightSection: {
            width: 'auto',
          },
        })}
        value={searchBarValue}
        onChange={(e) => setSearchBarValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        rightSection={
          <>
            {searchBarValue && (
              <CloseButton
                title="Close popover"
                size="xl"
                iconSize={20}
                onClick={handleClearSearch}
              />
            )}
            <Button
              styles={() => ({
                root: {
                  height: '100%',
                  width: '10vw',
                  minWidth: '80px',
                },
              })}
              radius="xl"
              onClick={() => handleSearch()}>
              <S />
            </Button>
          </>
        }
        placeholder="Search for movies, TV shows, keywords..."
      />
      <Space h="lg" />
      <Grid>
        <Col span={2}>
          <Text align="center">What's Your Mood ?</Text>
        </Col>
        <Col span={10}>
          <Carousel
            slideSize={`${(1 / 7) * 100}%`}
            slideGap="md"
            controlsOffset={0}
            dragFree
            align="start"
            initialSlide={
              searchParams.mood ? moods.indexOf(searchParams.mood) : 0
            }
            draggable
            loop
            styles={(theme) => ({
              viewport: {
                width: '95%',
                margin: '0 auto',
                cursor: 'grab',
              },
              control: {
                boxShadow: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                color: colorScheme === 'light' ? theme.black : theme.white,
                opacity: 1,
                '& svg': {
                  width: '30px',
                  height: '30px',
                },
              },
              slide: {
                display: 'flex',
                alignItems: 'center',
              },
            })}>
            {moods.map((mood, index) => (
              <Carousel.Slide key={index}>
                <Button
                  variant="filled"
                  fullWidth
                  radius="xl"
                  onClick={() => {
                    handleMoodClick(mood);
                  }}
                  styles={(theme) => ({
                    root: {
                      color:
                        colorScheme === 'light' && searchParams.mood !== mood
                          ? theme.black
                          : theme.white,
                      backgroundColor:
                        searchParams.mood === mood
                          ? theme.colors.primary
                          : colorScheme === 'light'
                          ? theme.colors.gray[0]
                          : theme.colors.dark,
                      '&:hover': {
                        backgroundColor: theme.colors.primary,
                        color: theme.white,
                      },
                    },
                  })}>
                  {mood}
                </Button>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Col>
      </Grid>
    </div>
  );
};

export default Search;
