import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // don’t forget to import

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
