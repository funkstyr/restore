import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from 'app/hooks';
import { basketItemSelector } from 'features/basket/basketSlice';

interface Props {
  toggleMode: () => void;
  isDarkMode: boolean;
}

const middleLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const navStyle = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
};

const Header: FC<Props> = (props) => {
  const { toggleMode, isDarkMode } = props;

  const cartItemCount = useAppSelector(
    (state) => basketItemSelector.selectTotal(state)
    // may want to loop through and count qty of each,
    // this is just each individual item
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h6" component={NavLink} to="/" sx={navStyle}>
            ReStore
          </Typography>

          <Switch checked={isDarkMode} onClick={toggleMode} />
        </div>

        <List sx={{ display: 'flex' }}>
          {middleLinks.map((link) => {
            const { title, path } = link;

            return (
              <ListItem component={NavLink} key={path} to={path} sx={navStyle}>
                {title}
              </ListItem>
            );
          })}

          <IconButton
            size="large"
            sx={{ color: 'inherit' }}
            component={NavLink}
            to="/basket"
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <ListItem component={NavLink} to="/login" sx={navStyle}>
            Login
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
