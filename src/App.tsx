import { LandingPage } from 'src/Pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, SxProps, ThemeProvider } from '@mui/material';
import { useEffect, useRef } from 'react';
import { lightTheme } from 'src/Shared/Theme';
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
    <ThemeProvider theme={lightTheme}>
      <Container sx={containerStyle}>
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
                <Route path="/app" element={<PrivateRoute />}>
                </Route>
              </Routes>
            </Router>
          </>
        }
      </Container>
    </ThemeProvider>
  );
};

export default App;