import "@../../app/globals.css";
import { list, del } from "../../apis/app";
import {
  Table,
  Row,
  TableColumnType,
  Empty,
  message,
  Spin,
  Button,
  Typography,
} from "antd";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import Provider from "../../providers/query-client-provider";
import { CopyToClipboard } from "react-copy-to-clipboard";

const _Page = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const fetchList = useCallback(async () => {
    return await list(page, size);
  }, [page, size]);

  const onDelete = () => {};

  const { data, isLoading, error } = useQuery("apps", fetchList);

  if (isLoading) {
    return <Spin spinning />;
  }

  if (error) {
    message.error("获取app列表失败");
    console.error(error);
    return <Empty />;
  }

  const columns: TableColumnType<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "密钥",
      dataIndex: "secret",
      key: "secret",
      render: (value) => {
        return (
          <CopyToClipboard text={value}>
            <Button type="primary">复制</Button>
          </CopyToClipboard>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "操作",
      render: (value, record, _) => {
        return (
          <Button
            danger
            onClick={() => {
              del(record.id)
                .then(() => {
                  message.success("删除成功");
                })
                .catch((err) => {
                  message.error("删除失败");
                  console.error(err);
                });
            }}
          >
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <Row justify="center">
      <Table
        dataSource={data?.list}
        columns={columns}
        pagination={{
          onChange: (page, pageSize) => {
            setPage(page);
            setSize(pageSize);
          },
          current: page,
          pageSize: size,
          total: data?.total,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </Row>
  );
};

const Page = () => {
  return (
    <Provider>
      <_Page />
    </Provider>
  );
};

export default Page;
