import { Box, styled, Tab, Tabs, Typography } from "@mui/material"

export const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
  },
  width: "100%",
  padding: "10px 0px",
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-around",

  },
  "& .MuiTabs-scroller": {
    maxWidth: "800px",
    minWidth: "350px",
    width: "100%"
  },
  display: "flex",
  justifyContent: "center"
});

export interface StyledTabProps {
  label: string;
  disabletab?: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme, disabletab }) => ({
  margin: "5px",
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  borderRadius: "12px",
  transition: theme.transitions.create(['color', "background-color"], {
    duration: theme.transitions.duration.standard,
  }),
  pointerEvents: (disabletab || disabletab === "true") ? "none" : "all",
  '&.Mui-selected': {
    color: 'black',
    backgroundColor: "#f3f3f3",
  },
  ...((!disabletab || disabletab === "false") && {
    "&:hover": {
      color: 'black',
    }
  })

}));


interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}
