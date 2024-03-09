import { Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { IUsers } from "./user.table";

interface IProps {
  access_token: string;
  getData: any;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: null | IUsers;
  setDataUpdate: any;
}

const UpdateUserModal = (props: IProps) => {
  const {
    access_token,
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    if (dataUpdate) {
      setName(dataUpdate.name);
      setEmail(dataUpdate.email);
      setPassword(dataUpdate.password);
      setAge(dataUpdate.age);
      setGender(dataUpdate.gender);
      setAddress(dataUpdate.address);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate]);

  const handleOk = async () => {
    if (dataUpdate) {
      const data = {
        _id: dataUpdate._id,
        name,
        email,
        age,
        gender,
        role,
        address,
      };
      const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      const d = await res.json();
      if (d.data) {
        await getData();
        notification.success({
          message: "Cập nhật người dùng thanh cong",
        });
        handleCloseCreateModal();
      } else {
        notification.error({
          message: "Co loi xay ra",
          description: JSON.stringify(d.message),
        });
      }
    }
  };

  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };

  return (
    <Modal
      title="Basic Modal"
      open={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <div>
        <label> Name:</label>
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <Input
          disabled
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <Input value={age} onChange={(event) => setAge(event.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <Input
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
      </div>
      <div>
        <label>Address:</label>
        <Input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div>
        <label>Role:</label>
        <Input value={role} onChange={(event) => setRole(event.target.value)} />
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
