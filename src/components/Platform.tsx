import { Badge, Popover, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PlatformDTO } from '../entities/media';
import { getCountryNameFromCountryCode } from '../helpers/countryHelper';

interface Props {
  platform: PlatformDTO;
}

const Platform = ({ platform }: Props) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Popover position="top" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Badge
          styles={() => ({
            root: {
              '&:hover': {
                cursor: 'pointer',
              },
            },
          })}
          color="primary"
          onClick={toggle}>
          {platform.name}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <Text>Available countries :</Text>
        {platform.country &&
          [...new Set(platform.country)].map((c, i) => {
            return (
              <span key={`${platform.name}_${i}`}>
                {i % 5 === 0 && i !== 0 && <br />}
                <Country country={c} />
              </span>
            );
          })}
      </Popover.Dropdown>
    </Popover>
  );
};

const Country = ({ country }: { country: string }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Tooltip
      position="top"
      withArrow
      opened={opened}
      label={<Text size="sm">{getCountryNameFromCountryCode(country)}</Text>}>
      <img
        onMouseEnter={open}
        onMouseLeave={close}
        width="30"
        height="20"
        style={{ padding: '0 5px', cursor: 'pointer' }}
        alt={country}
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
      />
    </Tooltip>
  );
};

export default Platform;
