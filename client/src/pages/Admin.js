import { Button, Card, Col, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import UserModel from "../components/UserModel";
import axiosHttp from "../http/axioshttp";

const Admin = () => {
  const [rowData, setRowData] = useState({
    id: "",
    fullName: "",
    age: 0,
    gender: "",
    favoriteFood: "",
    hairColor: "",
  });
  const [list, setList] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const getUserListData = async () => {
    const response = await axiosHttp.get(`/api/allusers`);
    setList(response.data.data);
  };
  useEffect(() => {
    getUserListData();
    return () => setList([]);
  }, []);

  const columns = [
    {
      title: "#",
      render: (_, record, index) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
    },
    {
      title: "Email",
      render: (_, record) => <Typography.Text>{record.email}</Typography.Text>,
    },
    {
      title: "Full Name",
      render: (_, record) => (
        <Typography.Text>{record.info?.fullName || "-"}</Typography.Text>
      ),
    },
    {
      title: "Age",
      render: (_, record) => (
        <Typography.Text>{record.info?.age || "-"}</Typography.Text>
      ),
    },
    {
      title: "Gender",
      render: (_, record) => (
        <Typography.Text>{record.info?.gender || "-"}</Typography.Text>
      ),
    },
    {
      title: "Favorite Food",
      render: (_, record) => (
        <Typography.Text>{record.info?.favoriteFood || "-"}</Typography.Text>
      ),
    },
    {
      title: "Hair Color",
      render: (_, record) => (
        <Typography.Text>{record.info?.hairColor || "-"}</Typography.Text>
      ),
    },
    {
      title: "",
      render: (_, record) => (
        <Button
          onClick={() => {
            setRowData({ id: record.id, ...record.info });
            setVisibility(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Row justify="center">
        <Col xs={20}>
          <Card title="All Users">
            <Table
              columns={columns}
              dataSource={list}
              pagination={false}
              rowKey={"id"}
            />
            <UserModel
              visibility={visibility}
              setVisibility={setVisibility}
              rowData={rowData}
              setRowData={setRowData}
              getUserListData={getUserListData}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const data = [
  {
    info: {
      fullName: "Test Name",
      age: 25,
      gender: "male",
      favoriteFood: "apple",
      hairColor: "black",
    },
    _id: "630b8ecb347d323d960d17c7",
    email: "test@gmail.com",
    isAdmin: false,
    __v: 0,
    id: "630b8ecb347d323d960d17c7",
  },
];

export default Admin;
