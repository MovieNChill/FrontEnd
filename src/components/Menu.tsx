import { NavLink } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { forum, home, library, medias } from '../constants/routes';
import { useNavigateWithQuery } from '../hooks/useNavigateWithQuery';
import { ThemeColoredIcon } from './ThemeColoredIcon';

interface MenuProps {
  onClick: () => void;
}

export const Menu = ({ onClick }: MenuProps) => {
  const { pathname } = useLocation();
  const { Link } = useNavigateWithQuery();

  return (
    <>
      {[home, medias, library, forum].map(({ icon, label, path }, index) => {
        const active = pathname.startsWith(path);
        return (
          <NavLink
            key={index}
            icon={<ThemeColoredIcon component={icon} themed={!active} />}
            component={Link}
            to={path}
            onClick={onClick}
            active={active}
            label={label}
            my="lg"
            py="lg"
            rightSection={<div>&#8203;</div>}
            styles={
              active
                ? (theme) => ({
                    root: {
                      position: 'relative',
                    },
                    rightSection: {
                      position: 'absolute',
                      right: 0,
                      backgroundColor: theme.colors.primary,
                      height: '100%',
                      width: '5px',
                    },
                  })
                : undefined
            }
          />
        );
      })}
    </>
  );
};
