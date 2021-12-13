import React, { Component } from 'react'
import { BackTop, List, Avatar, Button, PageHeader, Tag, Drawer, Space, Input, Select, DatePicker, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import MessageDetail from './component/MessageDetail'
import NewTopic from './component/NewTopic';
import './index.css'

const { TextArea } = Input;
const {Option} = Select;
const { RangePicker } = DatePicker;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      newTopicVisible: false,
      messageBoardVisible: false,
      commitObject: 'xxx',
      tagChildren: [
        { value: 'gold' },
        { value: 'lime' },
        { value: 'green' }, 
        { value: 'cyan' },
        { value: 'blue'}
      ],
      searchObject: {}
    };
    this.comment = this.comment.bind(this);
    this.tagChange = this.tagChange.bind(this);
    this.publisherChange = this.publisherChange.bind(this);
    this.topicChange = this.topicChange.bind(this);
    this.showNewTopicBoard = this.showNewTopicBoard.bind(this);
  }
  showMessageBoard(flag, listItem) {
    this.setState({ messageBoardVisible: flag})
    if(listItem) {
      this.setState({ commitObject: listItem.title || 'xxx'})
    }
  }

  showNewTopicBoard(flag) {
    this.setState({ newTopicVisible: flag});
  }

  comment(co) {
    console.log('co', co);
    this.setState({ commitObject: co})
  }
  tagChange(value, option) {
    console.log('value', value);
    console.log('option', option);
  }
  publisherChange(value, option) {
    console.log('value', value);
    console.log('option', option);
  }
  topicChange(value, option) {
    console.log('value', value);
    console.log('option', option);
  }

  componentDidMount() {
    let data = [];
    for (let i = 0; i < 4; i++) {
      data.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }
    this.setState({listData: data});
  }
  

  render() {
    const { listData, initLoading, loading, messageBoardVisible, commitObject, tagChildren, newTopicVisible } = this.state;

    function tagRender(props) {
      const { value, closable, onClose } = props;
      const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color={value}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 }}
        >
          {
            value === 'gold' ? '热血' 
            : value === 'lime' ? '搞笑' 
            : value === 'green' ? '无聊' 
            : value === 'cyan' ? '美食' 
            : '运动 '
          }
        </Tag>
      );
    }

    const style = {
      height: 40,
      width: 40,
      lineHeight: '40px',
      borderRadius: '50%',
      backgroundColor: '#1088e9',
      color: '#fff',
      textAlign: 'center',
      fontSize: 14,
    };

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 44,
            lineHeight: '32px',
            marginBottom: '12px',
          }}
        >
          <Button onClick={this.onLoadMore} style={{marginBottom: '12px'}}>loading more</Button>
          <BackTop visibilityHeight={100}>
            <div style={style}>UP</div>
          </BackTop>
        </div>
      ) : null;

    return (
      <div className="chetMessage-page">
        <PageHeader
          title="留言板"
          className="site-page-header"
          tags={<Tag color="blue">Running</Tag>}
          extra={[
            <Button key="3" type="primary" style={{marginLeft: '20px'}} onClick={() => this.showNewTopicBoard(true)}>
              NewTopic
            </Button>,
            <Button key="1" type="primary" style={{marginLeft: '20px'}}>
              Search
            </Button>,
            <Button key="2" type="primary" style={{marginLeft: '20px'}}>
              Reset
            </Button>,
          ]}
        >
        </PageHeader>
        {/* fiter-bar */}
        <Row>
          <Col span={24}>
            <div className='fiter-bar'>
              <Select
                mode="multiple"
                showArrow
                style={{float:  'left', marginRight: '20px', width: '30%'}}
                allowClear={true}
                placeholder="请输入标签 ："
                tagRender={tagRender}
                onChange={this.tagChange}
                options={tagChildren}
              >
              </Select>
              <Select
                style={{float:  'left', marginRight: '20px'}}
                showSearch
                allowClear={true}
                placeholder="请输入作者："
                optionFilterProp="children"
                onChange={() => this.publisherChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              <Select
                style={{float:  'left'}}
                showSearch
                allowClear={true}
                placeholder="请输入话题："
                onChange={() => this.topicChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              <RangePicker
              style={{ width: '230px', marginLeft: '20px'}}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                />
            </div>
          </Col>
        </Row>

        {/* 列表内容 */}
        <List
          className="list-container"
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={listData}
          loadMore={loadMore}
          renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <Button icon={<StarOutlined/>} >156</Button>,
              <Button icon={<LikeOutlined/>} >143</Button>,
              <Button icon={<MessageOutlined/>} onClick={() => this.showMessageBoard(true, item)}>2</Button>
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={ <Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}<Tag style={{ marginLeft: '10px'}} color='blue'>运动</Tag></a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
          )}
        />
        {/* 评论区抽屉  */}
        <Drawer
          title={`aaa Drawer`}
          placement="right"
          size={'large'}
          onClose={() => this.showMessageBoard(false)}
          visible={messageBoardVisible}
          closable={false}
          destroyOnClose={true}
          getContainer={false}
          footer={
            <Space className='footer-container'>
              <h3>回复 : <Tag style={{fontSize: '16px'}} color="geekblue">{commitObject}</Tag></h3>
              <TextArea 
                placeholder="说说你的观点和看法..." 
                showCount maxLength={100} 
                style={{ height: 60, width: 600}}
                allowClear={true}
              />
              <Button>发送</Button>
            </Space>
          }
        >
          <div>
          <MessageDetail comment={this.comment}/>
          </div>
          
        </Drawer>

        {/* NewTopic抽屉 */}
        <Drawer
          title="Create a new topic"
          width={720}
          onClose={() => this.showNewTopicBoard(false)}
          visible={newTopicVisible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={() => this.showNewTopicBoard(false)}>Cancel</Button>
              <Button onClick={() => this.showNewTopicBoard(false)} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <NewTopic/>
        </Drawer>
      </div>
    )
  }
}
