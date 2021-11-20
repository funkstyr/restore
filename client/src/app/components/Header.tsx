import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  toggleMode: () => void;
  isDarkMode: boolean;
}

const Header: FC<Props> = (props) => {
  const { toggleMode, isDarkMode } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">ReStore</Typography>

        <Switch checked={isDarkMode} onClick={toggleMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
