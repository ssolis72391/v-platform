import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Index() {
  const { logout } = useAuth();
  logout({ returnTo: window.location.origin });

  return null;
}
