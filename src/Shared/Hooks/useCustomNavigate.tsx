import { useNavigate, useLocation, To, NavigateOptions } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const navigateTo = (route: To, options: NavigateOptions = {}) => {
      const shouldReplace = route !== undefined && (route as string)[0] === "/" && route === pathname;
      return navigate(route, {...options, replace: options.replace ?? shouldReplace});
  }
  return navigateTo
}