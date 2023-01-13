import Icons from 'tabler-icons-react';

export const useCategories = () =>
  [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Short',
    'Sport',
    'Superhero',
    'Thriller',
    'War',
    'Western',
  ] as const;

export interface Platform {
  value: string;
  label: string;
  icon: keyof typeof Icons;
  group: string;
}

export const usePlatforms = () => {
  const getValueFromLabel = (label: string) => ({
    label: label,
    value: label.toLowerCase().replace(/ /g, '-'),
  });
  return [
    {
      ...getValueFromLabel('Netflix'),
      icon: 'BrandNetflix',
      group: 'Your platforms',
    },
    {
      ...getValueFromLabel('Disney+'),
      icon: 'BrandDisney',
      group: 'Your platforms',
    },
    {
      ...getValueFromLabel('Amazon Prime'),
      icon: 'BrandAmazon',
      group: 'Other platforms',
    },
    {
      ...getValueFromLabel('HBO'),
      icon: 'FishBone',
      group: 'Other platforms',
    },
  ] as Platform[];
};

export const useMoods = () => [
  'Cheerful',
  'Reflective',
  'Gloomy',
  'Melancholy',
  'Romantic',
  'Humorous',
  'Charlito',
  'Pépito',
];
