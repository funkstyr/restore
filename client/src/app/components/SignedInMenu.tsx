import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Fade, MenuItem } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signOutUser } from 'features/account/accountSlice';

const SignedInMenu = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.account);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick} sx={{ typography: 'h6' }}>
        {username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          My orders
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default SignedInMenu;
