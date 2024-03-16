import "./Sidebar.css";
import { AiFillHome } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
function Sidebar() {
  const links = [
    {
      text: "Home",
      to: "/home",
      icon: <AiFillHome />,
    },
    {
      text: "Add College",
      to: "/add-college",
      icon: <FaGraduationCap />,
    },
    {
      text: "Settings",
      to: "/settings",
      icon: <CiSettings />,
    },
  ];
  const navigate = useNavigate();

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="nav-links">
          {links.map((link,indx) => {
            return (
              <NavLink key={indx} to={link.to} className="nav-link">
                <span className="icon">{link.icon}</span>
                {link.text}
              </NavLink>
            );
          })}
          <div className="nav-link" onClick={removeUserFromLocalStorage}>
            <span className="icon">{<FiLogOut />}</span>
            {"Logout"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
