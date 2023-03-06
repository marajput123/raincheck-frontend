import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCustomNavigate } from "src/Shared/Hooks/useCustomNavigate";
import { useAppDispatch, useAppSelector } from '../Redux/Store';
import { logoutAction } from '../Redux/AuthSlice/Actions';


export default function Navbar() {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useCustomNavigate();

  const onNavigate = async (route: string) => {
    navigate(route);
  }

  const onLogout = async () => {
    try {
      await dispatch(logoutAction())
    } catch (error) {
      // TODO: Throw notification
      console.log(error)
    }
  }

  return (
    <Toolbar>
      <Typography onClick={() => { onNavigate("/") }} variant="h5" component="div" sx={{ flexGrow: 1, cursor: 'pointer', fontFamily: "Frijole", fontSize: "30px" }}>
        Evntful
      </Typography>
      {auth.isAuthenticated ?
        <>
          <Button onClick={() => onLogout()}>Log out</Button>
        </> :
        <>
          <Button onClick={() => onNavigate("/auth/login")} >Log in</Button>
          <Button onClick={() => onNavigate("/auth/sign-up")}>Sign Up</Button>
        </>
      }
    </Toolbar>
  );
}
