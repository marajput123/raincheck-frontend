import React, { useEffect, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { fetchPublicEvents } from "src/Shared/Api/Event";
import { InfinitLoaderTrigger } from "src/Shared/Components/InfiniteLoader";
import { EventList } from "src/Shared/Components/Event/EventList";
import { IEvent } from "src/Shared/Models/Event/IEvent";
import { Accordion, Button, InputAdornment, Stack, TextField, Typography, useMediaQuery, useTheme, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import { useCustomInfiniteQuery } from "src/Shared/Hooks/useCustomInfiniteQuery";
import { getCoordinates } from "src/Shared/Api/GoogleMaps/GoogleGeocode";
import { constructQueryFromParams, constructUri, EmptyString } from "src/Shared/Helpers";
import { usePresistValues } from "src/Shared/Hooks/usePresistValues";
import { IAllSearchQuery, ISearchQuery } from "src/Shared/Models/ISearchParams";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import EventIcon from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from "moment";
import { useCustomSearchParams } from "src/Shared/Hooks/useCustomSearchParams";
import { parseISO } from "date-fns";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import emptyData from "src/Shared/Svg/emptyData.svg";
import errorSVG from "src/Shared/Svg/error.svg";
import { Spinner } from "src/Shared/Components/Spinner";


export const SearchEvents = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Stack direction={isMobile ? "column" : "row"} sx={{ width: "100%" }}>
      <FilterPanel isMobile={isMobile} />
      <SearchPanel />
    </Stack>
  )
}

interface IFitlerPanelProps {
  isMobile: boolean;
}

export const FilterPanel = (props: IFitlerPanelProps) => {
  const { isMobile } = props;
  const { searchParams, setSearchParams, getSearchParamQuery } = useCustomSearchParams();
  const [startDate, setStartDate] = useState<Date>(getSearchParamQuery()["startDate[$gte]"] ? parseISO(getSearchParamQuery()["startDate[$gte]"]) : new Date());
  useEffect(() => {
    if (searchParams.has("startDate[$gte]")) {
      setStartDate(parseISO(getSearchParamQuery()["startDate[$gte]"]));
    }
  }, [searchParams.get("startDate[$gte]")])


  const onSaveFilter = () => {
    const query = getSearchParamQuery();
    const _query = {
      ...query,
      "startDate[$gte]": moment(startDate).format("YYYY-MM-DD")
    };
    setSearchParams(_query)
  }

  if (isMobile) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Accordion sx={{ boxShadow: "none", maxWidth: "500px", width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {/* <Typography>Filter</Typography> */}
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  value={parseISO(startDate.toISOString())}
                  onChange={(value) => setStartDate(value)}
                  renderInput={(params) => (
                    <TextField
                    {...params}
                      label="Events after"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment sx={{cursor: "pointer"}} position="end">
                            <EventIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button onClick={onSaveFilter}>Save filter</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    )
  }

  return (
    <Stack spacing={2} sx={{ marginTop: isMobile ? null : "5rem", width: "100%", maxWidth: "250px", paddingRight: "20px", borderRight: "1px solid #c4c4c4" }}>
      <Typography variant="h6">Filters</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          value={parseISO(startDate.toISOString())}
          onChange={(value) => setStartDate(value)}
          renderInput={(params) => (
            <TextField
            {...params}
            sx={{cursor: "pointer"}}
              label="Events after"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{cursor: "pointer"}} position="end">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>
      <Button onClick={onSaveFilter}>Save filter</Button>
    </Stack>
  )
}

export const SearchPanel = () => {
  const [searchParams] = useSearchParams();
  const searchParamsAddress = searchParams.get("_address");
  const [getPresistedValues, updatePresistedValuess] = usePresistValues<{ address: string, lat: string, long: string }>({
    address: EmptyString,
    lat: EmptyString,
    long: EmptyString
  })

  const navigate = useCustomNavigate();
  const uriQueryParams = window.location.search

  // TODO: Refactor this
  const searchQuery = React.useMemo(() => {
    const query: any = {};
    searchParams.forEach((value, key) => {
      if (!key.startsWith("_")) {
        query[key] = value
      }
    })
    return query
  }, [searchParams])


  const { isLoading, error, data, onInfiniteTrigger, } = useCustomInfiniteQuery(
    [`EventList/SearchPublicEvents/${searchParams.get("_address")}`, uriQueryParams],
    async ({ pageParam = 1 }) => {
      const query = { ...searchQuery };
      // TODO: Refactor this

      if (getPresistedValues().address !== searchParamsAddress && searchParamsAddress) {
        const coordinates = await getCoordinates(searchParams.get("_address"));
        updatePresistedValuess({
          address: searchParamsAddress,
          lat: coordinates.lat.toString(),
          long: coordinates.long.toString()
        })
      };

      if (getPresistedValues().lat || getPresistedValues().long) {
        query.lat = getPresistedValues().lat;
        query.long = getPresistedValues().long;
      }

      return fetchPublicEvents({
        page: pageParam - 1,
        ...query
      })
    }
  );

  const onEventCardClick = (e: React.SyntheticEvent, event: IEvent) => {
    navigate(`/events/${event._id}`)
  }

  if (isLoading) {
    return (<Box sx={{width: "100%"}}><Spinner/></Box>);
  }

  if (error) {
    return (
      <Stack sx={{width: "100%"}} alignItems="center">
        <img style={{ maxHeight: "500px" }} src={errorSVG} />
        <Typography variant="h5">Huh, something went wrong</Typography>
      </Stack>
    )
  }

  const renderEmptyData = () => {
    if (data.pages[0].content.length === 0) {
      return (
        <Stack alignItems={"center"}>
          <img style={{ maxHeight: "500px" }} src={emptyData} />
          <Typography variant="h5">Huh, we couldn't find anything.</Typography>
        </Stack>
      )
    }
  }

  return (
    <Stack sx={{ width: "100%", paddingTop: "20px" }} spacing={3}>
      {searchParams.get("_searchLabel") &&
        <Stack alignItems={"center"}>
          <Typography variant="h5">Searching by {searchParams.get("_searchLabel")}</Typography>
        </Stack>
      }
      {/* TODO: Add a loader | Add a error message */}
      {renderEmptyData()}
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          <EventList cardType="responsive" events={page.content} onEventCardClick={onEventCardClick} />
        </React.Fragment>
      ))}
      <InfinitLoaderTrigger onTriggerCallback={onInfiniteTrigger} />
    </Stack>
  )
};