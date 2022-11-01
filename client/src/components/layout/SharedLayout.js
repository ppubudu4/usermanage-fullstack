import React from "react";
import { Button, Col, Layout, Row, Typography } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../hooks/useUser";

const { Header, Content, Footer } = Layout;

const SharedLayout = () => {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout className="layout">
      <Header style={{ paddingTop: "20px" }}>
        <Row align="middle" justify="center">
          <Col xs={12}>
            <div>
              <Typography.Title
                level={3}
                style={{ color: "#FFF", marginBottom: 0 }}
                onClick={() => navigate("/")}
              >
                User Manager
              </Typography.Title>
            </div>
          </Col>
          {authState?.isAdmin && (
            <Col>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="text"
                  style={{ color: "#FFF" }}
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </Button>
              </div>
            </Col>
          )}
          <Col>
            {authState.authenticated && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="text" style={{ color: "#FFF" }} onClick={logOut}>
                  Logout
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            minHeight: "81vh",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        PUBUDU ©2022 Created by Pubudu Dananjaya
      </Footer>
    </Layout>
  );
};

export default SharedLayout;
