import { Group, Text } from '@mantine/core';
import { forwardRef } from 'react';
import * as Icons from 'tabler-icons-react';
import { MediasRow } from '../components/MediasRow';
import { MediasScroll } from '../components/MediasScroll';
import { ThemeColoredIcon } from '../components/ThemeColoredIcon';
import { getCurrentMonth } from '../helpers/dateHelper';
import { Platform } from '../hooks/mediasHooks';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';

type SelectPlatformItemProps = Platform & React.ComponentPropsWithoutRef<'div'>;

const SelectPlatformItem = forwardRef<HTMLDivElement, SelectPlatformItemProps>(
  ({ icon, label, ...others }: SelectPlatformItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ThemeColoredIcon component={Icons[icon]} />
        <Text>{label}</Text>
      </Group>
    </div>
  ),
);

export const Medias = () => {
  // const categories = useCategories();
  // const platforms = usePlatforms();

  // const [selectedCategory, setSelectedCategory] = useState<string | null>();
  // const [selectedPlatform, setSelectedPlatform] = useState<Platform>();

  // const { search } = useLocation();

  const { searchParams } = useNavigateWithQuery();

  return (
    <>
      {/* <Group>
        <Select
          aria-label="Category"
          placeholder="Category"
          variant="unstyled"
          clearable
          clearButtonLabel="Clear category select field"
          value={selectedCategory ?? null}
          onChange={(value) => setSelectedCategory(value)}
          maxDropdownHeight={300}
          icon={
            <ThemeColoredIcon
              component={Icons.Category}
              themed={!!selectedCategory}
            />
          }
          searchable
          nothingFound="No options"
          data={categories.map((category) => ({
            value: category.toLowerCase(),
            label: category,
          }))}
        />
        <Select
          aria-label="Platform"
          placeholder="Platform"
          variant="unstyled"
          clearable
          clearButtonLabel="Clear platform select field"
          value={selectedPlatform?.value ?? null}
          onChange={(value) =>
            setSelectedPlatform(platforms.find((p) => p.value === value))
          }
          maxDropdownHeight={300}
          icon={
            <ThemeColoredIcon
              component={
                selectedPlatform ? Icons[selectedPlatform.icon] : Icons.DeviceTv
              }
              themed={!!selectedPlatform}
            />
          }
          itemComponent={SelectPlatformItem}
          data={platforms}
        />
      </Group> */}
      {searchParams.q || searchParams.mood ? (
        <MediasScroll />
      ) : (
        <>
          <MediasRow title="Upcoming" />
          <MediasRow title="Recommended" />
          <MediasRow title={`Popular movies on ${getCurrentMonth()}`} />
        </>
      )}
    </>
  );
};
