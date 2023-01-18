import { Group } from '@mantine/core';
//import * as Icons from 'tabler-icons-react';
import MediasScroll from '../components/MediasScroll';

// type SelectPlatformItemProps = Platform & React.ComponentPropsWithoutRef<'div'>;

// const SelectPlatformItem = forwardRef<HTMLDivElement, SelectPlatformItemProps>(
//   ({ icon, label, ...others }: SelectPlatformItemProps, ref) => (
//     <div ref={ref} {...others}>
//       <Group noWrap>
//         <ThemeColoredIcon component={Icons[icon]} />
//         <Text>{label}</Text>
//       </Group>
//     </div>
//   ),
// );

const Medias = () => {
  //const platforms = usePlatforms();

  //const [selectedPlatform, setSelectedPlatform] = useState<Platform>();

  return (
    <>
      <Group>
        {/* <Select
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
        /> */}
      </Group>
      <MediasScroll />
      {/* {searchParams.q || searchParams.mood ? (
        <MediasScroll q={searchParams.q} mood={searchParams.mood} />
      ) : (
        <MediasRows />
      )} */}
    </>
  );
};

export default Medias;
