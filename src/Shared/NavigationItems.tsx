import ExploreIcon from '@mui/icons-material/Explore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export enum MenuItemKeys {
  explore = "explore",
  upcomingEvents = "upcomingEvents",
  pastEvents = "pastEvents",
  logout = "logout"
}

export interface IDrawerMenuItem {
  key: MenuItemKeys,
  label: string,
  to: string,
  icon: JSX.Element
}

export const drawerMenuItems: IDrawerMenuItem[] = [
  {
    key: MenuItemKeys.explore,
    label: "Explore",
    to: "/explore",
    icon: <ExploreIcon sx={{ color: "black" }} />
  },
  {
    key: MenuItemKeys.upcomingEvents,
    label: "Upcoming events",
    to: "/app/upcomingEvents",
    icon: <CalendarTodayIcon sx={{ color: "black" }} />
  },
  {
    key: MenuItemKeys.pastEvents,
    label: "Past events",
    to: "/app/pastEvents",
    icon: <CalendarMonthIcon sx={{ color: "black" }} />
  },
]