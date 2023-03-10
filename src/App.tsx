import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useEffect, useRef } from 'react';
import CustomTheme from 'src/Shared/Theme';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Progress from './Shared/Components/Progress';
import { OnlyPublicRoute } from './Shared/Components/Routes/OnlyPublicRoute';
import { PrivateRoute } from './Shared/Components/Routes/PrivateRoute';
import { useAppDispatch, useAppSelector } from './Shared/Redux/Store';
import { initialAuthCheckAction } from './Shared/Redux/AuthSlice/Actions';
import { useState } from 'react';
import { VerifyPage } from './Pages/Verify/VerifyPage';
import { CreateEventForm } from './Pages/Dashboard/CreateEvent';
import { Dashboard } from './Pages/Dashboard';
import { EventPage } from './Pages/Event';
import { ExplorePage } from 'src/Pages/Explore';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './Shared/ReactQuery';
import { RootLayout } from './Shared/Components/RootLayout';
import { PublicRoute } from './Shared/Components/Routes/PublicRoute';
import { ExploreEvents } from './Pages/Explore/ExploreEvents';
import { SearchEvents } from './Pages/Explore/SearchEvents';
import { EventView } from './Pages/Dashboard/Events';
import { ProfilePage } from './Pages/Dashboard/Profile';
import { EventSettingPage } from './Pages/Dashboard/EventSettings';
import { PageNotFoundPage } from './Pages/PageNotFound';

const App = () => {
  const auth = useAppSelector(state => state.auth)
  const timerRef = useRef<NodeJS.Timeout>()
  const [showLoader, setShowLoader] = useState(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialAuthCheckAction());
    /* eslint-disable react-hooks/exhaustive-deps */
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
              <RootLayout>
                <Routes>
                  {/* <Route path="/" element={<LandingPage />}></Route> */}
                  <Route path="/auth" element={<OnlyPublicRoute />}>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="sign-up" element={<SignUp />}></Route>
                    <Route path="verify" element={<VerifyPage />}></Route>
                    <Route path="*" element={<Navigate to={"/not-exist"} replace={true}/>} />
                  </Route>
                  <Route path="/app" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                    <Route path="create" element={<CreateEventForm />} />
                    <Route path="events" element={<EventView />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="events/:eventId/settings" element={<EventSettingPage />} />
                    <Route path="*" element={<Navigate to={"/not-exist"} replace={true}/>} />
                  </Route>
                  <Route path="/" element={<PublicRoute />}>
                    <Route path="/" element={<ExplorePage />}>
                      <Route index element={<ExploreEvents />} />
                      <Route path="/search" element={<SearchEvents />} />
                      <Route path="*" element={<Navigate to={"/not-exist"} />} />
                    </Route>
                    <Route path="events/:eventId" element={<EventPage />} />
                    <Route path="*" element={<Navigate to={"/not-exist"} replace={true}/>} />
                  <Route path="/not-exist" element={<PageNotFoundPage />} />
                  </Route>
                </Routes>
              </RootLayout>
            </Router>
          </>
        }
      </ThemeProvider>
    </QueryClientProvider>
  );
};


export default App;
