import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { Avatar, Fade, Stack } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../Redux/Store';
import { logoutAction } from '../Redux/AuthSlice/Actions';
import { useNavigate } from 'react-router-dom';
import { AvatarGroup } from './AvatarGroup';

const drawerWidth = 280;

enum MenuItemKeys {
  explore = "explore",
  upcomingEvents = "upcomingEvents",
  pastEvents = "pastEvents",
  logout = "logout"
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// TODO: remove after development:
const imagesrc = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"

export const PersistentDrawer = () => {
  const [open, setOpen] = useState(false);
  const [selectedMenuItemKey, setSelectedMenuItemKey] = useState<MenuItemKeys | null>();
  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const onSelect = (options: Omit<IMenuItem, "onClick">, to?: string) => {
    if (to) {
      navigate(to)
    }
    setSelectedMenuItemKey(options.menuItemKey);
  };

  const onLogoutClick = () => {
    dispatch(logoutAction())
  }

  return (
    <>
      <Drawer variant="permanent" open={open}>
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
            <MenuItem
              label={"Explore"}
              isDrawerOpen={open}
              menuItemKey={MenuItemKeys.explore}
              onClick={(_, options) => onSelect(options, "explore")}
              selectedKey={selectedMenuItemKey}
              icon={<ExploreIcon sx={{ color: "black" }} />}
            />
            <MenuItem
              label={"Upcoming events"}
              isDrawerOpen={open}
              menuItemKey={MenuItemKeys.upcomingEvents}
              selectedKey={selectedMenuItemKey}
              onClick={(_, options) => onSelect(options, "upcomingEvents")}
              icon={<CalendarMonthIcon sx={{ color: "black" }} />}
            />
            <MenuItem
              label={"Past events"}
              isDrawerOpen={open}
              menuItemKey={MenuItemKeys.pastEvents}
              selectedKey={selectedMenuItemKey}
              onClick={(_, options) => onSelect(options, "pastEvents")}
              icon={<CalendarTodayIcon sx={{ color: "black" }} />}
            />
          </List>
          <List sx={{ padding: "15px 10px" }}>
            <AvatarGroup
              imageuri={imagesrc}
              name="Muhammad Rajput"
              username='@coolio'
              userInfoContainerStyles={{opacity: open ? 1 : 0}}
            />
            {/* <Stack direction="row">
              <Avatar src={imagesrc}/>
              <Stack sx={{ pl: 1, opacity: open ? 1 : 0, }} direction="column" justifyContent="center">
                <Typography sx={{ marginBottom: "-5px" }}>Muhammad Rajput</Typography>
                <Typography variant="caption">@coolio</Typography>
              </Stack>
            </Stack> */}
            <MenuItem
              label={"Logout"}
              isDrawerOpen={open}
              menuItemKey={MenuItemKeys.logout}
              selectedKey={selectedMenuItemKey}
              onClick={onLogoutClick}
              icon={<LogoutIcon sx={{ color: "black" }} />}
            />
          </List>
        </Stack>
      </Drawer>
    </>
  )
}

interface IMenuItem {
  menuItemKey: MenuItemKeys;
  label: string;
  isDrawerOpen: boolean;
  hasNestedList?: boolean;
  selectedKey?: MenuItemKeys | null;
  icon?: React.ReactElement;
  onClick: (event: React.SyntheticEvent, options: Omit<IMenuItem, "onClick">) => void;
}

const MenuItem = (props: IMenuItem) => {
  const { menuItemKey, label, selectedKey, onClick, isDrawerOpen, icon, hasNestedList } = props;
  const backgroundColor = selectedKey && selectedKey === menuItemKey ? "#f3f3f3" : "";

  const onClickMenuItem = (event: React.SyntheticEvent) => {
    onClick(event, {
      menuItemKey,
      label,
      selectedKey,
      isDrawerOpen,
      icon,
      hasNestedList
    })
  }

  return (
    <ListItem
      key={menuItemKey}
      disablePadding
      sx={{ display: 'block', paddingTop: "10px" }}
    >
      <ListItemButton
        sx={{ minHeight: 48, px: 2.5, borderRadius: "10px", paddingLeft: "10px", backgroundColor: backgroundColor }}
        onClick={onClickMenuItem}
      >
        <ListItemIcon
          sx={{ minWidth: 0, mr: isDrawerOpen ? 1 : 'auto', justifyContent: 'center' }}
        >
          {icon ? icon : null}
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={{ opacity: isDrawerOpen ? 1 : 0 }}
        />
        {hasNestedList &&
          <Fade in={isDrawerOpen} unmountOnExit>
            {selectedKey === menuItemKey ? <ExpandLess /> : <ExpandMore />}
          </Fade>
        }
      </ListItemButton>
    </ListItem>
  )
}