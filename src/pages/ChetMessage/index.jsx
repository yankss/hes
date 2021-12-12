import React, { Component } from 'react'
import { List, Avatar, Button, PageHeader, Tag, Drawer, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './index.css'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      MessageBoardVisible: false,
    };
  }
  showMessageBoard(flag) {
    console.log(flag);
    this.setState({ MessageBoardVisible: flag})
  }

  componentDidMount() {
    let data = [];
    for (let i = 0; i < 2; i++) {
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
    const { listData, initLoading, loading, MessageBoardVisible } = this.state;
    
    const IconText = ({ icon, text }) => (
      icon === MessageOutlined ? 
      (
        <Button 
          style={{ borderRadius: '10px'}} 
          onClick={() => this.showMessageBoard(true)}>
            {React.createElement(icon)}
            {text}
        </Button>
      ) :
        <Button style={{ borderRadius: '10px'}} >
          {React.createElement(icon)}
          {text}
        </Button>
    );

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 44,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <div className="chetMessage-page">
        <PageHeader
          title="楼栋信息"
          className="site-page-header"
          tags={<Tag color="blue">Running</Tag>}
          extra={[
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
        >
        </PageHeader>
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
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <Drawer
                title={`aaa Drawer`}
                placement="right"
                size={'large'}
                onClose={() => this.showMessageBoard(false)}
                visible={MessageBoardVisible}
                closable={false}
                destroyOnClose={true}
                mask={false}
                // getContainer={false}
                extra={
                  <Space>
                    <Button onClick={() => this.showMessageBoard(false)}>Cancel</Button>
                    <Button type="primary" onClick={() => this.showMessageBoard(false)}>
                      OK
                    </Button>
                  </Space>
                }
              >
                <p>Some contents...</p>
              </Drawer>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    )
  }
}
