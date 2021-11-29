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
import SignedInMenu from './SignedInMenu';

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

  const cartItemCount = useAppSelector((state) => {
    const items = basketItemSelector.selectAll(state);
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  });

  const username = useAppSelector((state) => state.account.username);

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

          {!username ? (
            <ListItem component={NavLink} to="/account" sx={navStyle}>
              Login
            </ListItem>
          ) : (
            <SignedInMenu />
          )}
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
