import { Title, useMantineColorScheme } from '@mantine/core';
import { home } from '../../constants/routes';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import styles from './Logo.module.scss';
import logo from '/logo.svg';

const Logo = () => {
  const { navigate } = useNavigateWithQuery();
  const { colorScheme } = useMantineColorScheme();

  return (
    <div onClick={() => navigate(home.path)} className={styles.container}>
      <img
        src={logo}
        className={`${styles.logo} ${
          colorScheme === 'light' && styles.inverted
        }`}
        alt="Movie N' Chill logo"
      />
      <Title order={2} className={styles.title}>
        <div>Movie</div>
        <div>N' Chill</div>
      </Title>
    </div>
  );
};

export default Logo;
