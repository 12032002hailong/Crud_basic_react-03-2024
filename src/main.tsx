import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import UsersTable from "./components/users/user.table.tsx";

const items: MenuProps["items"] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: <Link to={"/users"}>Manage Users</Link>,
    key: "users",
    icon: <TeamOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersTable />,
      },
    ],
  },
  {
    path: "/tracks",
    element: <div>Trachks</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    {/* <App /> */}
  </React.StrictMode>
);
