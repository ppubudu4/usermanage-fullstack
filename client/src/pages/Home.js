import { Alert, Button, Card, Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";

import UserForm from "../components/UserForm";
import { useUser } from "../hooks/useUser";
import axiosHttp from "../http/axioshttp";

const Home = () => {
  const user = useUser();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const getUserData = async () => {
    const response = await axiosHttp.get(`/api/user/${user?.id}`);
    const {
      data: {
        info: { fullName, age, gender, favoriteFood, hairColor },
      },
    } = response.data;

    form.setFieldsValue({
      fullName: fullName,
      age: age,
      gender: gender,
      favoriteFood: favoriteFood,
      hairColor: hairColor,
    });
  };

  //load user
  useEffect(() => {
    getUserData();
  }, []);

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

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      const data = {
        fullName: values.fullName,
        age: values.age,
        gender: values.gender,
        favoriteFood: values.favoriteFood,
        hairColor: values.hairColor,
      };
      try {
        await axiosHttp.put(`/api/user/update/${user.id}`, data);
      } catch (error) {
        setError(error.response.data.message);
      }
    });
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col xs={12}>
          <Card title="Update Details">
            <Form layout="vertical" form={form}>
              <UserForm />

              {error !== null && (
                <Alert
                  style={{ marginBottom: "10px" }}
                  message={error}
                  type="error"
                />
              )}
              <Form.Item>
                <Button block type="primary" onClick={onSubmit}>
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
