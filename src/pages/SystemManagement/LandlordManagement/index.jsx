import React, { Component } from 'react';
import ListPage from '../../../widgets/list-page';
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
          title: 'IntegralValue',
          dataIndex: 'integralValue',
          key: 'integralValue',
          sorter: (a, b) => a.integralValue - b.integralValue,
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
          integralValue: 341,
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
          integralValue: 343,
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
          integralValue: 546,
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
          name: '??????',
          phone: '13566437666',
          integralValue: 3665,
          age: 32,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '5',
          name: '??????',
          phone: '13566437666',
          integralValue: 143,
          age: 32,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '6',
          name: '??????',
          phone: '13566437666',
          age: 32,
          integralValue: 223,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '7',
          name: '??????',
          phone: '13566437666',
          integralValue: 723,
          age: 32,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '8',
          name: '??????',
          phone: '13566437666',
          integralValue: 931,
          age: 32,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '9',
          name: '??????',
          phone: '13566437666',
          integralValue: 255,
          age: 32,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '10',
          name: '??????',
          phone: '13566437666',
          integralValue: 124,
          age: 32,
          address: '??????????????????388???',
          tags: ['cool', 'teacher', '??????'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
      ],
      title: '????????????',
      tableHeight: 500,
    }
    this.tableOnChange = this.tableOnChange.bind(this);
  }


  tableOnChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
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
          tableOnChange={this.tableOnChange}
        >
        </ListPage>
      </div>
    )
  }
}
