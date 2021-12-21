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
          width: '100px',
          render: text => <Button style={{paddingLeft: 0}} type="link">{text}</Button>,
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          width: '100px',
          key: 'phone',
          render: text => <Button style={{paddingLeft: '0'}} type='link' >{text}</Button>
        },
        {
          title: 'IntentionIdentity',
          dataIndex: 'intentionIdentity',
          width: '150px',
          align: 'center',
          key: 'intentionIdentity',
          filters: [
            {
              text: '租客',
              value: '租客'
            },
            {
              text: '房东',
              value: '房东'
            }
          ],
          onFilter: (value, record) => record.intentionIdentity.indexOf(value) === 0,
          render: text => text === '租客' ? (<Tag color="magenta">{text}</Tag>) :
          <Tag color="cyan">{text}</Tag>
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          width: '100px',
          filters: [
            {
              text: '男',
              value: '1'
            },
            {
              text: '女',
              value: '2'
            }
          ],
          onFilter: (value, record) => record.gender.indexOf(value) === 0,
          render: text => text === '1' ? (<Tag color="magenta">男</Tag>) :
          <Tag color="cyan">女</Tag>
        },
        {
          title: 'Liveness',
          width: '100px',
          dataIndex: 'liveness',
          key: 'liveness',
          sorter: (a, b) => a.liveness - b.liveness,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          width: '100px',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          width: '200px',
          ellipsis: true,
          render: address => (
            // <Tooltip placement="top" title={address}>
            //   <span>{address}</span>
            // </Tooltip>
            <Tooltip placement="top" title={this.getAddressText(address)} overlayStyle={{whiteSpace: 'pre'}}>
              <span>{this.getAddressText(address)}</span>
            </Tooltip>
          )
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          width: '300px',
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
          width: '200px',
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
          liveness: 341,
          phone: '13566437666',
          intentionIdentity: '租客',
          gender: '1',
          age: 32,
          // address: 'New York No. 1 Lake Park',
          address: ['New York No. 1 Lake Park', 'Sidney No. 1 Lake Park', 'London No. 1 Lake Park'],
          tags: ['商圈', '近地铁站', '市区', '工业区', ],
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
          liveness: 343,
          intentionIdentity: '房东',
          gender: '1',
          age: 42,
          // address: 'London No. 1 Lake Park',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
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
          liveness: 546,
          intentionIdentity: '房东',
          gender: '2',
          age: 32,
          // address: 'Sidney No. 1 Lake Park',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
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
          liveness: 3665,
          intentionIdentity: '租客',
          gender: '2',
          age: 32,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
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
          intentionIdentity: '租客',
          gender: '2',
          liveness: 143,
          age: 32,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'Sidney No. 1 Lake Park'],
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
          intentionIdentity: '租客',
          gender: '1',
          age: 32,
          liveness: 223,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
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
          intentionIdentity: '房东',
          gender: '2',
          liveness: 723,
          age: 32,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
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
          intentionIdentity: '房东',
          gender: '1',
          liveness: 931,
          age: 32,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '9',
          name: '小成',
          phone: '13566437666',
          gender: '1',
          liveness: 255,
          intentionIdentity: '租客',
          age: 32,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '10',
          name: '小成',
          phone: '13566437666',
          gender: '2',
          liveness: 124,
          intentionIdentity: '房东',
          age: 32,
          // address: '钟落潭广新路388号',
          address: ['New York No. 1 Lake Park', 'New York No. 1 Lake Park'],
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
      ],
      title: '潜客管理',
      tableHeight: 550,
      tableWidth: '100%'
    }
    this.tableOnChange = this.tableOnChange.bind(this);
    this.getAddressText = this.getAddressText.bind(this);
  }

  getAddressText(addressArr) {
    let text = '';
    addressArr.forEach(item => {
      text = text + item + ' ,\n' 
    })
    return text;
  }

  tableOnChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  render() {
    const { columns, data, title, tableHeight, tableWidth } = this.state;
    return (
      <div>
        <ListPage 
          columns={columns} 
          data={data} 
          title={title}
          tableHeight={tableHeight}
          tableOnChange={this.tableOnChange}
          tableWidth={tableWidth}
        >
        </ListPage>
      </div>
    )
  }
}
