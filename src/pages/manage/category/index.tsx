import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select, PageHeader, Space, Divider, Typography } from 'antd';
import { useAntdTable } from 'ahooks';
import * as service from '@/service';
import './index.less';
import FormRenderDrawer from '@/components/FormRenderDrawer';


export default function() {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState({
    visible: false,
    data: undefined,
  });
  const { tableProps, search } = useAntdTable(service.getCategoryList, {
    form,
    defaultParams: [
      { current: 1, pageSize: 10 },
      {
        sort: { createdAt: -1 },
      },
    ],
    formatResult(res){
      res.data.list.forEach((item)=>delete item.children);
      console.log('res.data: ', res.data);
      return res.data;
    },
  });
  const { submit, reset } = search;

  const add = function(){
    setEdit({
      visible: true,
      data: undefined,
    });
  };
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
    },
    {
      title: '操作',
      width: 180,
      render(){
        return (
          <Space split={<Divider type="vertical" />}>
            <Typography.Link>修改</Typography.Link>
            <Typography.Link type="danger">删除</Typography.Link>
          </Space>
        );
      },
    },
  ];
  const SearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="分类名称" name="categoryName">
              <Input placeholder="name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              重置
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
  return (
    <PageHeader
      className="manage-category"
      ghost={false}
      onBack={() => null}
      title="组件分类管理22"
      extra={[
        <Button key="1" type="primary" onClick={add}>
          新增
        </Button>,
      ]}
    >
      {SearchForm}
      <Table columns={columns} rowKey="_id" {...tableProps} />
      <FormRenderDrawer
        visible={edit.visible}
      >
        <div>1</div>
      </FormRenderDrawer>
    </PageHeader>
  );
}

