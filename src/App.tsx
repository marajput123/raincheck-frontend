import { LandingPage } from 'src/Pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, SxProps, TextField, ThemeProvider } from '@mui/material';
import { useEffect, useRef } from 'react';
import  CustomTheme from 'src/Shared/Theme';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Progress from './Shared/Components/Progress';
import Navbar from './Shared/Components/Navbar';
import PublicRoute from './Shared/Components/PublicRoute';
import PrivateRoute from './Shared/Components/PrivateRoute';
import { useAppDispatch, useAppSelector } from './Shared/Redux/Store';
import { initialAuthCheckAction } from './Shared/Redux/AuthSlice/Actions';
import { useState } from 'react';
import { VerifyPage } from './Pages/Verify/VerifyPage';
import { HomeView } from './Pages/Home/HomeView';
import { CreateEventForm } from './Pages/Dashboard/CreateEvent';
import { Dashboard } from './Pages/Dashboard';
import { UpcomingEvents } from './Pages/Dashboard/Events/UpcomingEvents';
import { EventPage } from './Pages/Dashboard/Events/Event';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './Shared/ReactQuery';

const containerStyle: SxProps = {
  minWidth: "360px",
  height: "90vh",
  maxHeight: "900px",
  padding: "0px"
};

const App = () => {
  const auth = useAppSelector(state => state.auth)
  const timerRef = useRef<NodeJS.Timeout>()
  const [showLoader, setShowLoader] = useState(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialAuthCheckAction());
  }, [])

  useEffect(() => {
    if (!auth.initialAuthCheckCompleted) {
      timerRef.current = setTimeout(() => {
        if (!auth.initialAuthCheckCompleted) {
          setShowLoader(true)
        }
      }, 1500)
    } else if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [auth.initialAuthCheckCompleted])

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={CustomTheme.lightTheme}>
        {!auth.initialAuthCheckCompleted ? <Progress showLoader={showLoader} /> :
          <>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/home" element={<HomeView />}></Route>
                <Route path="/auth" element={<PublicRoute />}>
                  <Route path="login" element={<Login />}></Route>
                  <Route path="sign-up" element={<SignUp />}></Route>
                  <Route path="verify" element={<VerifyPage />}></Route>
                </Route>
                <Route path="/app" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
                  <Route path="create" element={<CreateEventForm />}></Route>
                  <Route path="explore" element={<Explore/>}/>
                  <Route path="upcomingEvents" element={<UpcomingEvents/>}/>
                  <Route path="pastEvents" element={<PastEvents/>}/>
                  <Route path="create" element={<CreateEvents/>}/>
                  <Route path="events/:id" element={<EventPage/>}/>
                </Route>
              </Routes>
            </Router>
          </>
        }
    </ThemeProvider>
    </QueryClientProvider>
  );
};

const Explore = () => <>Explore</>;
const PastEvents = () => <>Past events</>;
const CreateEvents = () => <>Create events</>;

export default App;
