import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuItemKeys } from 'src/Shared/NavigationItems';
import { useLocation } from 'react-router-dom';

export interface IMenuItem {
    menuItemKey: MenuItemKeys;
    label: string;
    isDrawerOpen: boolean;
    highlightOnPath?: string
    icon?: React.ReactElement;
    onClick: (event: React.SyntheticEvent, options: Omit<IMenuItem, "onClick">) => void;
  }
  
  export const MenuItem = (props: IMenuItem) => {
    const { menuItemKey, label, onClick, highlightOnPath, isDrawerOpen, icon } = props;
    const currentPath = useLocation().pathname;
    const backgroundColor = highlightOnPath === currentPath ? "#f3f3f3" : "";
  
    const onClickMenuItem = (event: React.SyntheticEvent) => {
      onClick(event, {
        menuItemKey,
        label,
        isDrawerOpen,
        icon,
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
        </ListItemButton>
      </ListItem>
    )
  }
  
export interface ISwipableMenuItem {
    menuItemKey: MenuItemKeys;
    label: string;
    highlightOnPath?: string;
    icon?: React.ReactElement;
    onClick: (event: React.SyntheticEvent, options: Omit<ISwipableMenuItem, "onClick">) => void;
  }
  
  export const SwipableMenuItem = (props: ISwipableMenuItem) => {
    const { menuItemKey, label, highlightOnPath, onClick, icon } = props;
    const currentPath = useLocation().pathname;
    const backgroundColor = highlightOnPath === currentPath ? "#f3f3f3" : "";
  
    const onClickMenuItem = (event: React.SyntheticEvent) => {
      onClick(event, {
        menuItemKey,
        label,
        highlightOnPath,
        icon,
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
            sx={{ minWidth: 0, mr: 1, justifyContent: 'center' }}
          >
            {icon ? icon : null}
          </ListItemIcon>
          <ListItemText
            primary={label}
          />
        </ListItemButton>
      </ListItem>
    )
  }