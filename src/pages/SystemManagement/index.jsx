import React, { Component } from 'react';
import ListPage from '../../widgets/list-page';
import { Tag, Space, Button, Tooltip } from 'antd';
import { FundTwoTone, DeleteTwoTone, BulbTwoTone } from '@ant-design/icons';

export default class SystemManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns : [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <Button style={{paddingLeft: 0}} type="link">{text}</Button>,
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          render: text => <Tag color="magenta">{text}</Tag>
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          render: address => (
            <Tooltip placement="top" title={address}>
              <span>{address}</span>
            </Tooltip>
          )
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              {
                record.actionImg.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() => record.actionMethod[index](record)}
                    >
                      {item}
                    </Button>
                  )
                })
              }
            </Space>
          ),
        },
      ],
      data : [
        {
          key: '1',
          name: 'John Brown',
          phone: '13566437666',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '2',
          name: 'Jim Green',
          phone: '13566437666',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser', 'houseManagement'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '3',
          name: 'Joe Black',
          phone: '13566437666',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '4',
          name: '小成',
          phone: '13566437666',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '5',
          name: '小成',
          phone: '13566437666',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '6',
          name: '小成',
          phone: '13566437666',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '7',
          name: '小成',
          phone: '13566437666',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '8',
          name: '小成',
          phone: '13566437666',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
      ],
      title: '系统管理',
      tableHeight: 460,
    }
  }
  render() {
    const { columns, data, title, tableHeight} = this.state;
    return (
      <div>
        <ListPage 
          columns={columns} 
          data={data} 
          title={title}
          tableHeight={tableHeight}
        >
        </ListPage>
      </div>
    )
  }
}
