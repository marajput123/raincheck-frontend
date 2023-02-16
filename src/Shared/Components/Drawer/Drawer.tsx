import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Fade, Stack, Toolbar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from 'src/Shared/Redux/Store';
import { logoutAction } from 'src/Shared/Redux/AuthSlice/Actions';
import { AvatarGroup } from 'src/Shared/Components/AvatarGroup';
import { drawerMenuItems, MenuItemKeys } from 'src/Shared/NavigationItems';
import { IMenuItem, ISwipableMenuItem, MenuItem, SwipableMenuItem } from 'src/Shared/Components/Drawer/MenuItem';
import { StyledDrawer, StyledSwipeableDrawer } from 'src/Shared/Components/Drawer/Styles';

// TODO: remove after development:
const imagesrc = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"

export const PersistentDrawer = () => {
  const userState = useAppSelector(state => state.userAccount.user)
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onSelect = (options: Omit<IMenuItem, "onClick">, to?: string) => {
    if (to) {
      navigate(to)
    }
  };

  const onLogoutClick = () => {
    dispatch(logoutAction())
  }

  return (
    <>
      <StyledDrawer variant="permanent" open={open}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ padding: "10px 10px 16px 10px", height: "50px" }}
        >
          <Fade in={open} unmountOnExit>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <img style={{ height: "50px", width: "50px" }} src={process.env.PUBLIC_URL + '/LOGO.png'} alt="logo" />
            </Box>
          </Fade>
          <IconButton onClick={() => { setOpen(!open) }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <List sx={{ padding: "10px", flex: 1 }}>
            {drawerMenuItems.map((menuItem) => (
              <React.Fragment key={menuItem.key}>
                <MenuItem
                  label={menuItem.label}
                  isDrawerOpen={open}
                  menuItemKey={menuItem.key}
                  icon={menuItem.icon}
                  highlightOnPath={menuItem.highlightOnPath}
                  onClick={(_, options) => onSelect(options, menuItem.to)}
                />
              </React.Fragment>
            ))}
          </List>
          <List sx={{ padding: "15px 10px" }}>
            <AvatarGroup
              imageuri={imagesrc}
              name={`${userState.firstName} ${userState.lastName}`}
              username={`@${userState.username}`}
              userInfoContainerStyles={{ opacity: open ? 1 : 0 }}
            />
            <MenuItem
              label={"Logout"}
              isDrawerOpen={open}
              menuItemKey={MenuItemKeys.logout}
              onClick={onLogoutClick}
              icon={<LogoutIcon sx={{ color: "black" }} />}
            />
          </List>
        </Stack>
      </StyledDrawer>
    </>
  )
}

export const SwipeableTemporaryDrawer = () => {
  const userState = useAppSelector(state => state.userAccount.user)

  const [open, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onSelect = (options: Omit<ISwipableMenuItem, "onClick">, to?: string) => {
    if (to) {
      navigate(to)
    }
  };

  const onLogoutClick = () => {
    dispatch(logoutAction())
  }

  const toggle = () => setIsOpen(!open)

  return (
    <>
      <Toolbar variant="dense">
        <IconButton onClick={toggle}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <StyledSwipeableDrawer anchor='left' open={open} onOpen={toggle} onClose={toggle} sx={{ width: "280px" }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ padding: "10px 10px 16px 10px", height: "50px" }}
        >
          <Fade in={open} unmountOnExit>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <img style={{ height: "50px", width: "50px" }} src={process.env.PUBLIC_URL + '/LOGO.png'} alt="logo" />
            </Box>
          </Fade>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <List sx={{ padding: "10px", flex: 1 }}>
            {drawerMenuItems.map((menuItem) => (
              <React.Fragment key={menuItem.key}>
                <SwipableMenuItem
                  label={menuItem.label}
                  menuItemKey={menuItem.key}
                  icon={menuItem.icon}
                  highlightOnPath={menuItem.highlightOnPath}
                  onClick={(_, options) => onSelect(options, menuItem.to)}
                />
              </React.Fragment>
            ))}
          </List>
          <List sx={{ padding: "15px 10px" }}>
            <AvatarGroup
              imageuri={imagesrc}
              name={`${userState.firstName} ${userState.lastName}`}
              username={`@${userState.username}`}
            />
            <SwipableMenuItem
              label={"Logout"}
              menuItemKey={MenuItemKeys.logout}
              onClick={onLogoutClick}
              icon={<LogoutIcon sx={{ color: "black" }} />}
            />
          </List>
        </Stack>
      </StyledSwipeableDrawer>
    </>
  )
};


