import React, { Component } from 'react'
import { Input, Select, Row, Col, Form, Tag, Upload, Modal, message  } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import './index.css';

const { Option } = Select;
function getBase64ForAvatar(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
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
      rent: 0,
      imageUrl: '',
      formData: {},
      loading: false,
      previewVisible: false,
      previewImage: '',
      previewTitle: '图片上传',
      tagChildren: [
        { label: '热血', color: 'gold', value: 1 },
        { label: '搞笑', color: 'lime', value: 2 },
        { label: '无聊', color: 'green', value: 3 }, 
        { label: '美食', color: 'cyan', value: 4 },
        { label: '运动', color: 'blue', value: 5 }
      ],
      fileList: [
      ],
    };
    this.formRef = React.createRef();
    this.onChangeFormData = this.onChangeFormData.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  handleAvatarChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64ForAvatar(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  componentDidMount() {
    let { newHouseObject } = this.props;
    this.setState({ formData: newHouseObject})
    this.formRef.current.setFieldsValue(newHouseObject) 
    if(newHouseObject === {}) {
      this.formRef.current.resetFields();
    }
  }

  componentDidUpdate() {
    if (JSON.stringify(this.state.formData) === JSON.stringify(this.props.newHouseObject)) { return false }
    let { newHouseObject } = this.props;
    this.setState({ formData: newHouseObject})
    this.formRef.current.setFieldsValue(newHouseObject) 
    console.log(newHouseObject);
    if(newHouseObject === {}) {
      this.formRef.current.resetFields({});
    }
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

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleCancel = () => this.setState({ previewVisible: false });
  onChangeFormData(e) {
    console.log(e.target);
    let formDataObj = {};
    const { id, value } = e.target;
    formDataObj[`${id}`] = value;
    formDataObj = Object.assign(this.state.formData, formDataObj);
    this.setState({ formData: formDataObj})
  }
  selectOnChange(selection) {
    console.log('selection', selection);
    let formDataObj = {};
    if(selection instanceof Array) {
      formDataObj.tags = selection;
    }else {
      formDataObj.leaseState = selection;
    }
    formDataObj = Object.assign(this.state.formData, formDataObj)
    this.setState({ formData: formDataObj}, () => {
      console.log(this.state.formData);
    })
  }

  render() {
    const { tagChildren, 
            fileList, 
            previewVisible, 
            previewTitle, 
            previewImage, 
            imageUrl, 
            loading,
            formData } = this.state;


    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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
          style={{ marginRight: 3 }}
        >
          {label}
        </Tag>
      );
    }

    const uploadAvatarButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );


    return (
      <div>
        <Form 
          layout="vertical" 
          hideRequiredMark
          initialValues={formData}
          ref={this.formRef}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="avatar"
                valuePropName="fileList" 
                getValueFromEvent={this.normFile} 
                label="头像 :"
                rules={[{ required: true, message: 'Please enter avatar' }]}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  value={formData.avatar}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleAvatarChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} /> : uploadAvatarButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                label="房屋地址 :"
                rules={[{ required: true, message: 'Please enter Address' }]}
              >
                <Input 
                  value={formData.address} 
                  placeholder="Please enter Address" allowClear 
                  onChange={(e)=> this.onChangeFormData(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rent"
                label="月租 :"
                rules={[{ required: true, message: 'Please enter Rent' }]}
              >
                <Input 
                  value={formData.rent} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  addonAfter="RMB/Month" 
                  placeholder="Please enter Rent" 
                  allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaseState"
                label="是否已出租 :"
                rules={[{ required: true, message: 'Please choose the IsLease' }]}
              >
                <Select 
                  value={formData.leaseState} 
                  onChange={(selection)=> this.selectOnChange(selection)}
                  placeholder="Please choose the IsLease :" 
                  allowClear>
                  <Option value={1}>Yes</Option>
                  <Option value={0}>No</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="waterRate"
                label="水费单价 :"
                rules={[{ required: true, message: 'Please enter WaterRate' }]}
              >
                <Input 
                value={formData.waterRate} 
                onChange={(e)=> this.onChangeFormData(e)}
                addonAfter="RMB/Litre" placeholder="Please enter WaterRate" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="electricityRate"
                label="电费单价 :"
                rules={[{ required: true, message: 'Please enter ElectricityRate' }]}
              >
                <Input 
                  value={formData.electricityRate} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  addonAfter="RMB/Kilowatt" placeholder="Please enter ElectricityRate" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="landlordName"
                label="房东名字 :"
                rules={[{ required: true, message: 'Please enter LandlordName' }]}
              >
                <Input 
                  value={formData.landlordName} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="Please enter LandlordName" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="landlordPhone"
                label="房东电话 :"
                rules={[{ required: true, message: 'Please enter LandlordPhone' }]}
              >
                <Input 
                  value={formData.landlordPhone} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="Please enter LandlordPhone" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="renterName"
                label="租客名字 :"
                rules={[{ required: true, message: 'Please enter RenterName' }]}
              >
                <Input 
                  value={formData.renterName} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="Please enter RenterName" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="renterPhone"
                label="租客电话 :"
                rules={[{ required: true, message: 'Please enter RenterPhone' }]}
              >
                <Input 
                  value={formData.renterPhone} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="Please enter RenterPhone" allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tags"
                label="房屋标签 :"
                rules={[{ required: true, message: 'Please select tags' }]}
              >
                <Select
                  mode="multiple"
                  value={formData.tags}
                  showArrow
                  style={{float:  'left', marginRight: '20px', width: '100%'}}
                  allowClear={true}
                  placeholder="Please select tags :"
                  tagRender={tagRender}
                  onChange={(selection) => this.selectOnChange(selection)}
                  options={tagChildren}
                >
                </Select>
              </Form.Item>
            </Col>
          </Row>
 
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="房屋描述 :"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea 
                  value={formData.description}
                  onChange={(e)=> this.onChangeFormData(e)}
                  rows={4} placeholder="please enter url description" allowClear/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="3D全景图 :"
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
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
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
