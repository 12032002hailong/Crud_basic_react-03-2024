import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";

interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVkNGEzMTJmODU3ZjcwY2U0MGFiNjc4IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDg2ODgxODQsImV4cCI6MTc5NTA4ODE4NH0.2ZaF98bZxvA4gDt2aMCbXjhytfZdOh-OFAql9nVovQ0";

    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data1 = await res.json();
    setListUsers(data1.data.result);
  };

  const columns: ColumnsType<IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <>
      <h2>Table</h2>
      <Table columns={columns} dataSource={listUsers} />
    </>
  );
};
export default UsersTable;
