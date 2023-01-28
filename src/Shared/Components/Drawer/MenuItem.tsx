import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Fade } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { MenuItemKeys } from 'src/Shared/NavigationItems';

export interface IMenuItem {
    menuItemKey: MenuItemKeys;
    label: string;
    isDrawerOpen: boolean;
    hasNestedList?: boolean;
    selectedKey?: MenuItemKeys | null;
    icon?: React.ReactElement;
    onClick: (event: React.SyntheticEvent, options: Omit<IMenuItem, "onClick">) => void;
  }
  
  export const MenuItem = (props: IMenuItem) => {
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
  
export interface ISwipableMenuItem {
    menuItemKey: MenuItemKeys;
    label: string;
    hasNestedList?: boolean;
    selectedKey?: MenuItemKeys | null;
    icon?: React.ReactElement;
    onClick: (event: React.SyntheticEvent, options: Omit<ISwipableMenuItem, "onClick">) => void;
  }
  
  export const SwipableMenuItem = (props: ISwipableMenuItem) => {
    const { menuItemKey, label, selectedKey, onClick, icon, hasNestedList } = props;
    const backgroundColor = selectedKey && selectedKey === menuItemKey ? "#f3f3f3" : "";
  
    const onClickMenuItem = (event: React.SyntheticEvent) => {
      onClick(event, {
        menuItemKey,
        label,
        selectedKey,
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
            sx={{ minWidth: 0, mr: 1, justifyContent: 'center' }}
          >
            {icon ? icon : null}
          </ListItemIcon>
          <ListItemText
            primary={label}
          />
          {hasNestedList && ((selectedKey === menuItemKey) ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
    )
  }