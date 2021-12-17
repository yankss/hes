import React, { Component } from 'react';
import { Table, Pagination, Tag, PageHeader, Row, Typography, } from 'antd';
import './index.css'

const { Column } = Table;
const { Paragraph } = Typography;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: '',
      expandedArr: [],
      
    }
  }
  render() {

    const { columns, data, title, tableHeight, tableExpand, headerButtonArray, filterBar, tableWidth, tableOnChange } = this.props;
    const { expandedArr, } = this.state;
    
    const content = (
      <>
        <Paragraph className='page-header-description'>
          Ant Design interprets the color system into two levels: a system-level color system and a
          product-level color system.
        </Paragraph>
        {
          filterBar
        }
      </>
    );

    const Content = ({ children, extraContent }) => (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
      </Row>
    );

    
    return (
      <div className="my-content">
        <PageHeader
          title={title}
          className="site-page-header"
          tags={<Tag color="blue">Running</Tag>}
          extra={headerButtonArray}
        >
          <Content>
            {content}
          </Content>
        </PageHeader>
        <Table 
          row={(record =>  {
            return `${record.key}`
          })}
          dataSource={data} 
          pagination={false}
          scroll={{ y: tableHeight, x: tableWidth }}
          expandable={tableExpand}
          expandedRowKeys={expandedArr}
          onRow={(record, index) => {
            return {
              onClick: event => {
                if(expandedArr.length === 0) {
                  this.setState({ expandedArr: [record.key]})
                }else if(expandedArr[0] !== record.key){
                  this.setState({ expandedArr: [record.key]})
                }else {
                  this.setState({ expandedArr: []})
                }
              },
            }
          }}
          onChange={tableOnChange}
        >
          {
            columns.map((item,index) => {
            return (
              <Column
                key={index}
                title={item.title}
                dataIndex={item.key}
                align={item.align || 'left'}
                render={item.render}
                sorter={item.sorter}
                width={item.width}
                fixed={item.fixed}
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
