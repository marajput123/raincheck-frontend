import React, { useRef, useState } from 'react';
import { TextField, Typography, Button, Stack, SxProps, Box } from '@mui/material';
import { useDocumentTitle } from 'src/Shared/Hooks/useDocumentTitle';
import { useCustomNavigate } from 'src/Shared/Hooks/useCustomNavigate';
import { IEvent } from 'src/Shared/Models/IEvent';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { BasicsTab, ICreateEventFormData } from './Tabs/BasicsTab';
import { SummaryTab } from './Tabs/SummaryTab';

const rootStackStyle: SxProps = {
  width: "100%"
}
const stackStyle: SxProps = {
  width: "340px",
  minHeight: "500px",
  paddingTop: "20px"
}



const CreateEvent = () => {
  useDocumentTitle("Create Event")
  const [formStep, setFormStep] = useState(1);
  const [eventForm, setEventForm] = useState<Partial<IEvent>>({})
  const [eventURL, setEventURL] = useState("")

  const navigate = useCustomNavigate();

  const onSubmit = async () => {
    const {date, name, description, location, link} = eventForm
    // const event: IEvent = {
    //   date: new Date(),
    //   name: "",
    //   description: "",
    //   location: "",
    // };
    try {
      setEventURL(`www.tmp-product.com/${name}`)
      setFormStep(2)
    } catch (error) {
      console.log(error);
    }
  }

  const updateForm = (eventFormData: ICreateEventFormData) => {
    const {name, description, link} = eventFormData
    setEventForm({
      name,
      description,
      link,
      location:"121 Davis Drive, Chapel hill road, 27503"
    });
    onSubmit()
  }

  const onNavigate = async (route: string) => {
    navigate(route);
  }

  return (
    <>
      <Stack sx={rootStackStyle} alignItems="center">
        <Stack sx={stackStyle} spacing={2}>
          {formStep === 1 ? <BasicsTab  updateForm={updateForm}/> : <SummaryTab eventURL={eventURL}/> }
        </Stack>
      </Stack>
    </>
  );
}

export default CreateEvent;
