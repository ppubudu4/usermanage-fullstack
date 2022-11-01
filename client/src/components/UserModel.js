import { Alert, Button, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axiosHttp from "../http/axioshttp";
import UserForm from "./UserForm";

const UserModel = ({
  rowData,
  setRowData,
  visibility,
  setVisibility,
  getUserListData,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  //error time out
  useEffect(() => {
    let timeOut;
    if (error !== null) {
      timeOut = setTimeout(() => {
        setError(null);
      }, 3500);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [error]);

  useEffect(() => {
    if (visibility) {
      form.setFieldsValue({
        fullName: rowData.fullName,
        age: rowData.age,
        gender: rowData.gender,
        favoriteFood: rowData.favoriteFood,
        hairColor: rowData.hairColor,
      });
    }
  }, [visibility]);
  const handleCancel = () => {
    setRowData({
      id: "",
      fullName: "",
      age: 0,
      gender: "",
      favoriteFood: "",
      hairColor: "",
    });
    setVisibility(false);
  };
  const onOk = () => {
    form.validateFields().then(async (values) => {
      const data = {
        fullName: values.fullName,
        age: values.age,
        gender: values.gender,
        favoriteFood: values.favoriteFood,
        hairColor: values.hairColor,
      };
      try {
        await axiosHttp.put(`/api/user/update/${rowData.id}`, data);
        setRowData({
          id: "",
          fullName: "",
          age: 0,
          gender: "",
          favoriteFood: "",
          hairColor: "",
        });
        setVisibility(false);
        getUserListData();
      } catch (error) {
        setError(error.response.data.message);
      }
    });
  };
  return (
    <Modal centered visible={visibility} onCancel={handleCancel} onOk={onOk}>
      <Form layout="vertical" form={form}>
        <UserForm />
        {error !== null && (
          <Alert
            style={{ marginBottom: "10px" }}
            message={error}
            type="error"
          />
        )}
      </Form>
    </Modal>
  );
};

export default UserModel;
