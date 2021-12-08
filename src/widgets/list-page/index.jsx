import React, { Component } from 'react';
import { Table, Pagination, Button, Tag, PageHeader, Row, Typography } from 'antd';
import './index.css'

const { Column } = Table;
const { Paragraph } = Typography;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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

    const { columns, data, title, tableHeight} = this.props;
    return (
      <div className="my-content">
        <PageHeader
          title={title}
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
          dataSource={data} 
          pagination={false}
          scroll={{ y: tableHeight }}
          rowSelection={{}}
        >
          {
            columns.map((item,index) => {
            return (
              <Column
                key={index}
                title={item.title}
                dataIndex={item.key}
                align={item.align || 'center'}
                render={item.render}
              >
              </Column>
            )
            })
          }
        </Table>
        <Pagination
          total={data.length}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共${total}条`}
          className="my-pagination"
          pageSizeOptions={[5, 10, 20]}
          pageSize={5}
        />
      </div>
    )
  }
}
