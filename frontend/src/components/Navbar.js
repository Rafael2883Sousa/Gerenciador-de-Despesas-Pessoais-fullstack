import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user && (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
};