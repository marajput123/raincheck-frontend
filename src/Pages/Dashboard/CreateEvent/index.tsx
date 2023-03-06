import React, { useRef, useState } from 'react';
import { Typography, Button, Stack, SxProps, CircularProgress,
         Box, Stepper, Step, StepLabel } from '@mui/material';
import { axiosInstance } from "src/Shared/Axios";
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useForm, UseFormReturn } from "react-hook-form";
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import BasicsTab from './Tabs/BasicsTab';
import PersonalizeTab from './Tabs/PersonalizeTab';
import AdvancedTab from './Tabs/AdvancedTab';
import SummaryTab from './Tabs/SummaryTab';

const stackStyle: SxProps = {
  width: "330px",
  minHeight: "500px",
  paddingTop: "20px"
}

export interface ICreateEventFormData {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  where: string;
  location: {
    type: string,
    coordinates: number[]
  };
  address: string;
  link: string;
  image: string;
  isPrivate: boolean;
}

export interface ICreateFormTab {
  form: UseFormReturn<ICreateEventFormData, any>;
}

const steps = ['Enter basic info', 'Personalize your event', 'Advanced options'];

export const CreateEventForm = () => {
  useDocumentTitle("Create Event");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [eventUrl, setEventUrl] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const form = useForm<ICreateEventFormData>({
    defaultValues: {
      where: "address",
      isPrivate: false
    },
    mode: 'all'
  });

  const navigate = useCustomNavigate();

  const createEvent = async (data: ICreateEventFormData) => {

    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('startDate', data.startDate)
    formData.append('endDate', data.endDate)
    formData.append('description', data.description)
    formData.append('location', JSON.stringify(data.location))
    formData.append('address', data.address)
    formData.append('link', data.link)
    formData.append('image', data.image)
    formData.append('isPrivate', JSON.stringify(data.isPrivate))

    try {
      const response = await axiosInstance
        .post("/events", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      const event = response.data.content;
      setEventUrl(`www.soshalup.com/app/events/${event._id}`);
      navigate(`/events/${event._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const isStepOptional = (step: number) => {
    /* return step === 2; */
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    /* const geolocation = await geocodeLocation({ address: "108 Old Maple Lane" });
     * console.log(geolocation); */

    if (activeStep === 2) {
      setShowLoader(true);
      form.handleSubmit(createEvent)();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack sx={{ width: '100%' }} alignContent='center'>
      <Typography sx={{ margin: 3 }} variant="h4">
        Create an event
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Stack alignItems="center">
        <Stack sx={stackStyle} spacing={2}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <SummaryTab eventUrl={eventUrl}/>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Create another event</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? <BasicsTab form={form}/> :
               activeStep === 1 ? <PersonalizeTab form={form}/> : <AdvancedTab form={form}/> }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                    </Button>
                    )} */}
                {showLoader? <CircularProgress /> :
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                }
              </Box>
            </React.Fragment>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
