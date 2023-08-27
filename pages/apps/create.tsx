import "@../../app/globals.css";
import { create } from "../../apis/app";

import {
  Form,
  Input,
  Button,
  Row,
  Space,
  Descriptions,
  Card,
  message,
  Divider,
  Col,
} from "antd";
import { useState } from "react";

interface Response {
  id: string;
  name: string;
  secret: string;
}

const Page = () => {
  const [resp, setResp] = useState<Response>();

  const onFinish = (values: any) => {
    create({ name: values.name })
      .then((resp) => setResp(resp))
      .catch((err) => {
        message.error("创建应用失败");
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row justify="center">
      <Form
        className="mt-[10%] min-w-[400px] w-[50%]"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row justify="center">
          <Space direction="horizontal" size="middle" align="baseline">
            <Form.Item
              label="应用名称"
              name="name"
              rules={[{ required: true, message: "请输入应用名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Form.Item>
          </Space>
          {resp && (
            <Card>
              <Descriptions column={1} title="密钥信息">
                <Descriptions.Item label="ID">{resp.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{resp.name}</Descriptions.Item>
                <Descriptions.Item label="secret">
                  {resp.secret}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Row>
      </Form>
    </Row>
  );
};

export default Page;
