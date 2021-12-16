import React, { Component } from 'react'
import { Button, Row, Col, Tag, Space } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import ListPage from  '../../widgets/list-page'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerButtonArray: [
        <Button key="1" type="primary">
          Primary
        </Button>,
      ],
      columns: [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'School', dataIndex: 'school', key: 'school' },
        { title: 'IdCard', dataIndex: 'idCard', key: 'idCard' },
        { title: 'IsCertificationPass', 
          dataIndex: 'isCertificationPass', 
          key: 'isCertificationPass' ,
          render: (text, record) =>
              <div>
                {
                  text ===  'Yes' ? 
                  <Tag color='green'>Yes</Tag> : 
                  <Tag color='red'>No</Tag>
                }
              </div>
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (text, record) => <Space>
            <Button>Allow</Button>
            <Button >NoPass</Button>
          </Space>,
        },
      ],
      data: [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
          school: '仲恺大学',
          idCard: '440222399481928132',
          isCertificationPass: 'Yes'
        },
        {
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
          school: '仲恺大学',
          idCard: '440222340281928132',
          isCertificationPass: 'Yes'
        },
        {
          key: 3,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
          school: '仲恺大学',
          idCard: '440224789231928132',
          isCertificationPass: 'No'
        },
      ],
      title: '认证中心',
      tableHeight: 460
    };

  }
  render() {
    const { columns, data, title, tableHeight, headerButtonArray } = this.state;
    const tableExpand = {
      expandedRowRender: record => <div>
        <Row>
          {
            columns.map((item, index) => {
              if(item.title !== 'Action') {
                return (
                  <Col span={5} key={item.key} style={{marginTop: '10px'}}>
                      <Tag color='blue'>{item.title}</Tag> : { record[`${item.key}`]} 
                  </Col>
                )
              }else {
                return null;
              }
              
            })
          }
        </Row>
      </div>,
      rowExpandable: record => record.name !== 'Not Expandable',
      expandIcon: ({ expanded, onExpand, record }) =>
        expanded ? (
          <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
        ) : (
          <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
        )
      
    }
    return (
      <div>
        <ListPage
          columns={columns}
          data={data}
          title={title}
          tableHeight={tableHeight}
          tableExpand={tableExpand}
          headerButtonArray={headerButtonArray}
        />
      </div>
    )
  }
}
