import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  onChangeSideBar: (title: string) => void;
};

const Sidebar: React.FC<any> = (props: Props) => {
  const location = useLocation();

  const handleLinkClick = (title: string) => {
    props.onChangeSideBar(title);
  };

  return (
    <div className="left-side">
      <aside className="bg-gray-900 text-white w-64 min-h-screen">
        <img src="/images/reactApp.png" alt="logo" />

        <nav className="navigation">
          <ul className="mt-4">
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "gras" : ""}
                onClick={() => handleLinkClick("Acceuil")}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className={location.pathname === "/tasks" ? "gras" : ""}
                onClick={() => handleLinkClick("Taches")}
              >
                Tâches
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "gras" : ""}
                onClick={() => handleLinkClick("About")}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
