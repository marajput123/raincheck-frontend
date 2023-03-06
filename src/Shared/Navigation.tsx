import ExploreIcon from '@mui/icons-material/Explore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export enum MenuItemKeys {
  explore = "explore",
  events = "events",
  logout = "logout"
}

export interface IDrawerMenuItem {
  key: MenuItemKeys,
  label: string,
  to: string,
  icon: JSX.Element
  highlightOnPath?: string
}

export const drawerMenuItems: IDrawerMenuItem[] = [
  {
    key: MenuItemKeys.explore,
    label: "Explore",
    to: "/",
    highlightOnPath: "/",
    icon: <ExploreIcon sx={{ color: "black" }} />
  },
  {
    key: MenuItemKeys.events,
    label: "Events",
    to: "/app/events",
    highlightOnPath: "/app/events",
    icon: <CalendarTodayIcon sx={{ color: "black" }} />
  },
]