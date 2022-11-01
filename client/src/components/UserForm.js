import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

const UserForm = () => {
  return (
    <>
      <Form.Item label="Full Name" name="fullName">
        <Input />
      </Form.Item>
      <Form.Item label="Age" name="age">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Favorite Food" name="favoriteFood">
        <Input />
      </Form.Item>
      <Form.Item label="Hair Color" name="hairColor">
        <Input />
      </Form.Item>
    </>
  );
};

export default UserForm;
