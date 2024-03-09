import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Popconfirm,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";

export interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
  address: string;
  gender: string;
  password: string;
  age: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjVkNGEzMTJmODU3ZjcwY2U0MGFiNjc4IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDg2ODgxODQsImV4cCI6MTc5NTA4ODE4NH0.2ZaF98bZxvA4gDt2aMCbXjhytfZdOh-OFAql9nVovQ0";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data1 = await res.json();
    if (!data1.data) {
      notification.error({
        message: JSON.stringify(data1.message),
      });
    }
    setListUsers(data1.data.result);
  };

  const confirm = async (user: IUsers) => {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const d = await res.json();
    if (d.data) {
      notification.success({
        message: "Xoa User thanh cong",
      });
    } else {
      notification.error({
        message: JSON.stringify(d.message),
      });
    }
    await getData();
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
    {
      title: "Actions",
      render: (value, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                setDataUpdate(record);
                setIsUpdateModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the task"
              description={`Are you sure to delete user name = ${record.name}`}
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginLeft: 20 }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#c94087" }}>Table</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add new user
        </Button>
      </Header>

      <Table columns={columns} dataSource={listUsers} />

      <CreateUserModal
        access_token={access_token}
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpdateUserModal
        access_token={access_token}
        getData={getData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};
export default UsersTable;
