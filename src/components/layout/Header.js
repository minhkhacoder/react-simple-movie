/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const LinkList = [
  {
    id: 1,
    to: "/",
    title: "Home",
  },
  {
    id: 2,
    to: "/movie",
    title: "Movies",
  },
];

const Header = () => {
  return (
    <header className="flex items-center justify-center py-10 text-white header gap-x-5">
      {LinkList.length > 0 &&
        LinkList.map((item) => (
          <NavLink
            to={item.to}
            key={item.id}
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            {item.title}
          </NavLink>
        ))}
    </header>
  );
};

export default Header;
