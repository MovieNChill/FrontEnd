import { Carousel } from '@mantine/carousel';
import {
  Button,
  CloseButton,
  Col,
  Grid,
  Select,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import { Filter as F, Search as S } from 'tabler-icons-react';
import { medias } from '../constants/routes';
import { Filter } from '../entities/extends/queryParams';
import { useFilters } from '../hooks/mediasHooks';
import { useColorSchemeLocalStorage } from '../hooks/useColorSchemeLocalStorage';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import { getGenres } from '../services/mediaService';
import Loader from './Loader';
import ThemeColoredIcon from './ThemeColoredIcon';

const Search = () => {
  // const { colorScheme } = useColorSchemeLocalStorage();
  // const moods = useMoods();
  const { navigate, clearSearchParam, searchParams } = useNavigateWithQuery();
  const { colorScheme } = useColorSchemeLocalStorage();
  const filters = useFilters();

  const [searchBarValue, setSearchBarValue] = useState(
    searchParams.q ||
      searchParams.name ||
      searchParams.director ||
      searchParams.writers?.join(',') ||
      searchParams.stars?.join(',') ||
      searchParams.description ||
      '',
  );
  const [selectedFilter, setSelectedFilter] = useState<
    keyof Filter | undefined
  >(
    (searchParams.name ? 'name' : undefined) ||
      (searchParams.director ? 'director' : undefined) ||
      (searchParams.writers ? 'writers' : undefined) ||
      (searchParams.stars ? 'stars' : undefined) ||
      (searchParams.description ? 'description' : undefined) ||
      undefined,
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.genres || [],
  );

  useEffect(() => {
    handleSearchAndCategory();
  }, [selectedCategories]);

  const handleSearchAndCategory = () => {
    const filter = searchBarValue
      ? selectedFilter
        ? { [selectedFilter]: searchBarValue }
        : { q: searchBarValue }
      : undefined;
    const genres = selectedCategories.length
      ? { genres: selectedCategories }
      : undefined;
    navigate(medias.path, { ...filter, ...genres });
  };

  const handleClearSearch = () => {
    setSearchBarValue('');
    clearSearchParam(selectedFilter ?? 'q');
  };

  // const handleMoodClick = (mood: string) => {
  //   mood === searchParams.mood
  //     ? clearSearchParam('mood')
  //     : navigate(medias.path, { mood });
  // };

  const handleCheckCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const categories = useAsync(() => getGenres(), []);

  if (categories.loading || !categories.value) {
    return <Loader />;
  }
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
            handleSearchAndCategory();
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
            <Select
              aria-label="Filter"
              placeholder="Filter"
              variant="unstyled"
              iconWidth={20}
              clearable
              clearButtonLabel="Clear filter select field"
              value={selectedFilter ?? null}
              onChange={(value) => setSelectedFilter(value as keyof Filter)}
              maxDropdownHeight={300}
              icon={
                <ThemeColoredIcon component={F} themed={!!selectedFilter} />
              }
              data={filters}
              styles={() => ({
                root: {
                  width: 120,
                },
              })}
            />
            <Button
              styles={() => ({
                root: {
                  height: '100%',
                  width: '10vw',
                  minWidth: '80px',
                },
              })}
              radius="xl"
              onClick={() => handleSearchAndCategory()}>
              <S />
            </Button>
          </>
        }
        placeholder="Search movies, TV shows..."
      />
      <Space h="lg" />
      <Grid>
        <Col span={2}>
          <Text align="center">Category</Text>
        </Col>
        <Col span={10}>
          <Carousel
            slideSize={`${(1 / 7) * 100}%`}
            slideGap="md"
            controlsOffset={0}
            dragFree
            align="start"
            initialSlide={
              selectedCategories[0]
                ? categories.value.indexOf(selectedCategories[0])
                : 0
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
            {categories.value.map((category, index) => (
              <Carousel.Slide key={index}>
                <Button
                  variant="filled"
                  fullWidth
                  radius="xl"
                  onClick={() => handleCheckCategory(category)}
                  styles={(theme) => ({
                    root: {
                      color:
                        colorScheme === 'light' &&
                        selectedCategories.includes(category)
                          ? theme.black
                          : theme.white,
                      backgroundColor: selectedCategories.includes(category)
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
                  {category}
                </Button>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Col>
      </Grid>
      {/* <Grid>
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
      </Grid> */}
    </div>
  );
};

export default Search;
