import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaHome, FaRegListAlt, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("admin layout: ", user);

  if (isLoading) return <h1>Loading ...</h1>;

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/service">
                  <FaRegListAlt /> services
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome /> home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
