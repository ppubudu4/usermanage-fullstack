import React, { useEffect } from "react";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, clearLoginError } from "../redux/actions/authActions";

const Login = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  //error time out
  useEffect(() => {
    let timeOut;
    if (authState.error !== null) {
      timeOut = setTimeout(() => {
        dispatch(clearLoginError());
      }, 3500);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [authState.error]);

  //login submit
  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      try {
        await dispatch(login(data));
        navigate("/");
      } catch (error) {}
    });
  };
  return (
    <div>
      <Row justify="center" align="middle">
        <Col xs={12}>
          <Card title="Login">
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
              {authState.error !== null && (
                <Alert
                  style={{ marginBottom: "10px" }}
                  message={authState.error}
                  type="error"
                />
              )}
              <Form.Item>
                <Button block type="primary" onClick={onSubmit}>
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Button block type="ghost" onClick={() => navigate("/register")}>
              Register
            </Button>
            <blockquote style={{ marginTop: "10px" }}>
              Email: admin@gmail.com {" | "} Password: admin123
            </blockquote>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
