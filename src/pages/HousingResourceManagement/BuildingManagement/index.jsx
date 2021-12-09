import React, { Component } from 'react';
import { Table, Tag, Space, Button, Pagination, PageHeader, Typography, Row } from 'antd';
import './index.css'
import { FundTwoTone, DeleteTwoTone, BulbTwoTone } from '@ant-design/icons';

const { Paragraph } = Typography;

export default class index extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      columns : [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <Button type="link">{text}</Button>,
          align: 'center'
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
                      style={{ borderRadius: '10px' }}
                      onClick={() => record.actionMethod[index](text)}
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
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
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
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '成熟', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '5',
          name: '华发地产',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'good', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '6',
          name: '恒大地产',
          age: 32,
          address: '广州天河恒大 ',
          tags: ['cool', 'loser', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '7',
          name: '敏捷地产',
          age: 32,
          address: '新沙地铁站',
          tags: ['cool', 'perfer', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '8',
          name: '豪进广场',
          age: 32,
          address: '广州增城区',
          tags: ['cool', 'teacher', '成熟', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
      ],
      selectedRow: ''
    };
    this.showFundTwoTone = this.showFundTwoTone.bind(this);
    this.showDeleteTwoTone = this.showDeleteTwoTone.bind(this);
    this.showBulbTwoTone = this.showBulbTwoTone.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.onClickSelectRow = this.onClickSelectRow.bind(this);
  
  }


  showFundTwoTone(text) {
    console.log('show');
    console.log('text', text);
  }
  showDeleteTwoTone(text) {
    console.log('delete');
    console.log('text', text);
  }
  showBulbTwoTone(text) {
    console.log('bulb');
    console.log('text', text);
  }
  selectRow(changeableRowKeys) {
    console.log('changeableRowKeys', changeableRowKeys);
  }
  onClickSelectRow() {

  }

  render() {
    const IconLink = ({ src, text }) => (
      <a className="example-link" href="/">
        <img className="example-link-icon" src={src} alt={text} />
        {text}
      </a>
    );
    const content = (
      <>
        <Paragraph>
          Ant Design interprets the color system into two levels: a system-level color system and a
          product-level color system.
        </Paragraph>
        <Paragraph>
          Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
          easier for designers to have a clear psychological expectation of color when adjusting colors,
          as well as facilitate communication in teams.
        </Paragraph>
        <div>
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text="Quick Start"
          />
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
            text=" Product Info"
          />
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            text="Product Doc"
          />
        </div>
      </>
    );
    const Content = ({ children, extraContent }) => (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
      </Row>
    );
    const { columns, data,  } = this.state;
    return (
      <div className="my-content">
        <PageHeader
          title="楼栋信息"
          className="site-page-header"
          tags={<Tag color="blue">Running</Tag>}
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
        >
          <Content>
            {content}
          </Content>
        </PageHeader>
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false}
          scroll={{ y: 460 }}
          // rowSelection={{
          //   type: 'radio',
          //   selectedRowKeys: [selectedRow],
          //   onChange: (_, selectedRows) => {
          //     this.setState({ selectedRow:selectedRows[0].key })
          //     }
            
          // }}
          // onRow={record => {
          //   return {
          //     onClick: event => {
          //       this.setState({ selectedRow: record.key })
          //     }
          //   }
          // }}
        />
        <Pagination
          total={data.length}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共${total}条`}
          className="my-pagination"
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
    )
  }
}
