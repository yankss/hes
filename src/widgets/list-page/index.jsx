import React, { Component } from 'react';
import { Table, Pagination, Tag, PageHeader, Row, Typography, Form, Input, Select, Col } from 'antd';
import './index.css'

const { Column } = Table;
const { Paragraph } = Typography;
const { Option } = Select;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: '',
      expandedArr: [],
      searchData: {},
    }
    if(props.onRef) {
      props.onRef(this);
    }
    this.expandHandle = this.expandHandle.bind(this);
    this.onChangeSearchData = this.onChangeSearchData.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
    this.resetHandle = this.resetHandle.bind(this);
  }

  expandHandle(record, index) {
    const { expandedArr } = this.state;
    return {
      onClick: event => {
        if(event.target.cellIndex === 7 
          || event.target.innerText === 'Allow' 
          || event.target.innerText === '确 定'
          || event.target.innerText === 'Cancel'
          || event.target.innerText === 'OK'
          || event.target.innerText === '取 消') {
          return;
        }
        if(expandedArr.length === 0) {
          this.setState({ expandedArr: [record.key]});
        }else if(expandedArr[0] !== record.key){
          this.setState({ expandedArr: [record.key]});
        }else {
          this.setState({ expandedArr: []})
        }
        if(this.props.title === '认证中心') {
          this.props.getExpandedArr(this.state.expandedArr);
        }
        if(event.target.innerText === 'NoPass' && expandedArr.length !== 0) {
          this.setState({ expandedArr: [record.key]});
        }
        
      }
    }
  }

  resetHandle() {
    this.setState({ searchData: {} })
  }

  onChangeSearchData(e) {
    let searchDataObj = {};
    let { id, value } = e.target;
    searchDataObj[`${id}`] = value;
    searchDataObj = Object.assign(this.state.searchData, searchDataObj);
    // this.setState({ searchData: searchDataObj }, () => {
    //   console.log(this.state.searchData);
    // })
  }

  selectOnChange(selection) {
    let searchDataObj = {};
    if(selection instanceof Array) {
      searchDataObj.tags = selection;
    }else {
      searchDataObj.leaseState = selection;
    }
    searchDataObj = Object.assign(this.state.searchData, searchDataObj)
    // this.setState({ searchData: searchDataObj}, () => {
    //   console.log(this.state.searchData);
    // })
  }



  render() {

    const { columns, data, title, tableHeight, tableExpand, headerButtonArray, filterBar, tableWidth, tableOnChange } = this.props;
    const { expandedArr, searchData } = this.state;

    function tagRender(props) {
      const { value, closable, onClose, label } = props;
      let color = 
      value === 1 ? 'gold'
      : value === 2 ? 'lime'
      : value === 3 ? 'green'
      : value === 4 ? 'cyan'
      : 'blue'
      const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color={color}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 , fontSize: '.7rem'}}
        >
          {label}
        </Tag>
      );
    }
    const content = (
      <>
        <Paragraph className='page-header-description'>
          {this.props.moduleDescription || `Ant Design interprets the color system into two levels: a system-level color system and a
          product-level color system.`} 
        </Paragraph>
        <Form >
          <Row className='filter-bar'>
            {
              filterBar ? filterBar.map((item, index) => {
                return (
                  <Col 
                    span={item.span}
                    key={item.name}
                    style={{marginRight: '20px'}}
                  >
                    <Form.Item
                      name={item.name}
                    >
                      {
                        item.type === 'input' ?
                        (
                          <Input 
                            style={{height: '30px'}}
                            value={searchData[item.value]} 
                            placeholder={item.placeholder} 
                            onChange={(e)=> this.onChangeSearchData(e)}
                            allowClear 
                          />
                        )
                        : item.type === 'select' && item.mode === 'multiple' ?
                        (
                          <Select
                            mode={item.mode}
                            showArrow
                            value={searchData[item.value]}
                            style={{float:  'left', width: '100%', fontSize: '.62rem'}}
                            allowClear={true}
                            onChange={(selection)=> this.selectOnChange(selection)}
                            placeholder={item.placeholder}
                            tagRender={tagRender}
                            options={item.options}
                          >
                          </Select>
                        )
                        : item.type === 'select' && item.mode === 'tags' ?
                        (
                          <Select
                            showArrow
                            value={searchData[item.value]}
                            style={{float:  'left', width: '100%', fontSize: '.62rem'}}
                            allowClear={true}
                            onChange={(selection)=> this.selectOnChange(selection)}
                            placeholder={item.placeholder}
                          >
                            <Option value={1}>已出租</Option>
                            <Option value={0}>未出租</Option>
                          </Select>
                        )
                        : null
                      }
                    </Form.Item>
                  </Col>
                )
              })
              : null
            }
          </Row>
        </Form>
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
          onChange={tableOnChange}
          onRow={(record, index) => this.expandHandle(record, index)}
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
                filters={item.filters}
                onFilter={item.onFilter}
                ellipsis={item.ellipsis}
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
