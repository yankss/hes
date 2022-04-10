import React, { Component } from 'react'
import { Input, Select, Row, Col, Form, Tag, Avatar, List, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as uploadApi from '../../../../api/upload.js'

const { Option } = Select;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class NewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '图片上传',
      formData: {},
      listData: [],
      tagChildren: [
        { value: 'gold' },
        { value: 'lime' },
        { value: 'green' }, 
        { value: 'cyan' },
        { value: 'blue'}
      ],
      fileList: [
        
      ],
    };
  }

  componentDidMount() {
    let data = [];
    for (let i = 0; i < 1; i++) {
      data.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
      });
    }
    this.setState({listData: data});
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ file, fileList, event }) => {
    let listLength = this.state.fileList.length;
    let { illustrations } = this.state.formData;
    if(file.response) {
      let formDataObj = {}
      if(listLength > 1) {
        formDataObj.illustrations = illustrations + `、${file.response.data}`;
      }else {
        formDataObj.illustrations = file.response.data;
      }
      formDataObj = Object.assign(this.state.formData, formDataObj);
      this.setState({ formData: formDataObj }, () => {
        console.log(this.state.formData);
      });
    }
    this.setState({ fileList });
    
  }

  handleCancel = () => this.setState({ previewVisible: false });

  uploadHandle = () => {
    let {fileList} = this.state;
    console.log(fileList);
    let file = fileList[0];
    console.log(file);
    uploadApi.upload(file).then(res => {
      console.log(res);
    })
    
  }

  onChangeFormData = (e) => {
    console.log(e);
    let formDataObj = {};
    const { id, value } = e.target;
    formDataObj[`${id}`] = value;
    formDataObj = Object.assign(this.state.formData, formDataObj);
    this.setState({ formData: formDataObj}, () => {
      console.log(this.state.formData);
    })
  }

  selectOnChange = (selection) => {
    console.log('selection', selection);
    let formDataObj = {};
    if(selection instanceof Array) {
      formDataObj.tag = selection;
    }else {
      formDataObj.leaseState = selection;
    }
    formDataObj = Object.assign(this.state.formData, formDataObj)
    this.setState({ formData: formDataObj}, () => {
      console.log(this.state.formData);
    })
  }


  render() {
    const { formData,listData, tagChildren, fileList, previewVisible, previewTitle, previewImage } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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


    return (
      <div>
        <List
          className="list-container"
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={listData}
          renderItem={item => (
          <List.Item
            key={item.title}
          >
            <List.Item.Meta
              avatar={ <Avatar src={item.avatar} />}
              title={<a href={item.href}>Yankxx</a>}
            />
          </List.Item>
          )}
        />
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="topicTitle"
                label="话题标题"
                rules={[{ required: true, message: 'Please enter topicTitle' }]}
              >
                <Input 
                  placeholder="Please enter topicTitle" 
                  allowClear 
                  value={formData.topicTitle}
                  onChange={(e)=> this.onChangeFormData(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tag"
                label="标签类型"
                rules={[{ required: true, message: 'Please select tag' }]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  style={{float:  'left', marginRight: '20px', width: '100%'}}
                  allowClear={true}
                  placeholder="Please select tag ："
                  tagRender={tagRender}
                  value={formData.tag}
                  onChange={(selection)=> this.selectOnChange(selection)}
                  options={tagChildren}
                >
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="canComment"
                label="能否评论"
                rules={[{ required: true, message: 'Please choose the CanComment' }]}
              >
                <Select 
                  placeholder="Please choose the CanComment" 
                  allowClear
                  value={formData.canComment} 
                  onChange={(selection)=> this.selectOnChange(selection)}
                >
                  <Option value="1">Yes</Option>
                  <Option value="2">No</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="mainContent"
                label="话题内容"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="please enter url description" 
                  allowClear
                  value={formData.topicTitle}
                  onChange={(e)=> this.onChangeFormData(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="插图"
                rules={[
                  {
                    required: true,
                    message: 'please enter url Illustrations',
                  },
                ]}
              >
                <Form.Item
                style={{margin: 0}}
                  name="illustrations"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url Illustrations',
                    },
                  ]}
                >
                  <Upload
                    action="http://localhost:8181/file/upload"
                    // action=""
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                </Form.Item>
                <span style={{ color: '#aaaaaa'}}>图片顺序为轮播图顺序，务必上传最少一张图片。</span>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
