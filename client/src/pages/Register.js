import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { clearRegisterError, register } from "../redux/actions/authActions";

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  //error time out
  useEffect(() => {
    let timeOut;
    if (authState.error !== null) {
      timeOut = setTimeout(() => {
        dispatch(clearRegisterError());
      }, 3500);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [authState.error]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      const data = {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        age: values.age,
        gender: values.gender,
        favoriteFood: values.favoriteFood,
        hairColor: values.hairColor,
      };
      dispatch(register(data, navigate));
    });
  };
  return (
    <div>
      <Row justify="center" align="middle">
        <Col xs={12}>
          <Card title="Register">
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input type="password" />
              </Form.Item>

              <UserForm />
              {authState.error !== null && (
                <Alert
                  style={{ marginBottom: "10px" }}
                  message={authState.error}
                  type="error"
                />
              )}
              <Form.Item>
                <Button block type="primary" onClick={onSubmit}>
                  Register
                </Button>
              </Form.Item>
            </Form>
            <Button block type="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
