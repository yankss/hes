import React, { Component } from 'react'
import { Input, Select, Row, Col, Form, Tag, Upload, Modal, Transfer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as tagApi from '../../api/tagApi';
import './index.css';

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
      rent: 0,
      formData: {},
      vrPreviewVisible: false,
      carouselPreviewVisible: false,
      vrPreviewImage: '',
      carouselPreviewImage: '',
      vrPreviewTitle: '图片上传',
      carouselPreviewTitle: '图片上传',
      tagChildren: [],
      vrFileList: [],
      carouselFileList: [],
      dataSource: [
        {
          key: 'haveRefrigerator',
          title: "冰箱",
        },
        {
          key: 'haveWashingMachine',
          title: "洗衣机",
        },
        {
          key: 'haveWaterHeater',
          title: "热水器",
        },
        {
          key: 'haveAirConditioner',
          title: "空调",
        },
        {
          key: 'haveSofa',
          title: "沙发",
        },
        {
          key: 'haveLampblackMachine',
          title: "油烟机",
        },
        {
          key: 'haveKitchenBurningGas',
          title: "燃气灶",
        },
        {
          key: 'haveCookMeal',
          title: "可做饭",
        },
        {
          key: 'haveTv',
          title: "电视",
        },
        {
          key: 'haveNetwork',
          title: "宽带",
        },
        {
          key: 'haveWardrobe',
          title: "衣柜",
        },
        {
          key: 'haveBed',
          title: "床",
        },
        {
          key: 'haveToilet',
          title: "卫生间",
        },
        {
          key: 'haveSmartLock',
          title: "智能门锁",
        },
        {
          key: 'haveBalcony',
          title: "阳台",
        },
      ],
      targetKeys: [],
      hosueFacility: {}
    };
    this.formRef = React.createRef();
    this.onChangeFormData = this.onChangeFormData.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.vrFileList;
  };

  componentDidMount() {
    this.getTag();
    let { newHouseObject } = this.props;
    this.setState({ formData: newHouseObject})
    this.formRef.current.setFieldsValue(newHouseObject) 
    if(newHouseObject === {}) {
      this.formRef.current.resetFields();
    }
  }

  componentDidUpdate() {
    let { newHouseObject } = this.props;
    let { formData } = this.state;
    if (JSON.stringify(formData) === JSON.stringify(newHouseObject)) { return false }
    this.setState({ formData: newHouseObject})
    this.formRef.current.setFieldsValue(newHouseObject) 
    // if(JSON.stringify(newHouseObject) !== '{}') {
    //   this.formRef.current.setFieldsValue(newHouseObject) 
    // }else if(JSON.stringify(newHouseObject) === '{}') {
    //   this.formRef.current.resetFields();
    // }
  }

  getTag = () => {
    tagApi.getAllTag().then(res => {
      let tagList = [];
      tagList = res.data.map(item => {
        let tagItem = {};
        tagItem.value = item.tagName
        tagItem.label = item.tagName
        return tagItem;
      })
      this.setState({ tagChildren: tagList })
    })
  }

  handlecPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      carouselPreviewImage: file.url || file.preview,
      carouselPreviewVisible: true,
      carouselPreviewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      vrPreviewImage: file.url || file.preview,
      vrPreviewVisible: true,
      vrPreviewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  vrImgHandleChange = ({ fileList }) => {
    this.setState({ vrFileList: fileList })
  };

  handleVrCancel = () => this.setState({ vrPreviewVisible: false });

  carouselImgHandleChange = ({ fileList }) => this.setState({ carouselFileList: fileList });

  handleCarouselCancel = () => this.setState({ carouselPreviewVisible: false });
  
  onChangeFormData(e) {
    let formDataObj = {};
    let { id, value, type } = e.target;
    if(type === 'number') {
      value = parseFloat(value);
    }
    formDataObj[`${id}`] = value;
    formDataObj = Object.assign(this.state.formData, formDataObj);
    this.setState({ formData: formDataObj}, () => {
      console.log(this.state.formData);
    })
  }
  selectOnChange(selection) {
    let formDataObj = {};
    if(selection instanceof Array) {
      formDataObj.tag = selection;
    }else {
      if(selection === 1) {
        this.props.changeIsRented(false);
      }else {
        this.props.changeIsRented(true);
      }
      formDataObj.leaseState = selection;
    }
    formDataObj = Object.assign(this.state.formData, formDataObj)
    this.setState({ formData: formDataObj}, () => {
      console.log(this.state.formData);
    })
  }

  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    console.log(targetKeys);
    this.setState({ targetKeys });
    let hosueFacility = {};
    targetKeys.forEach(item => {
      hosueFacility[`${item}`] = 1
    })
    this.setState({ hosueFacility });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };




  render() {
    const { tagChildren, 
            vrFileList, 
            vrPreviewVisible, 
            vrPreviewImage, 
            vrPreviewTitle, 
            carouselPreviewVisible,
            carouselPreviewImage,
            carouselPreviewTitle,
            formData,
            dataSource,
            targetKeys,
            carouselFileList } = this.state;

    const { isNewButton, isRented } = this.props;


    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    function tagRender(props) {
      const { value, closable, onClose, label } = props;
      let color = 
      value === '热血' ? 'gold'
      : value === '搞笑' ? 'lime'
      : value === '无聊' ? 'green'
      : value === '美食' ? 'cyan'
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
                name="houseTitle"
                label="房屋标题 :"
                rules={[{ required: true, message: '请输入房屋标题...' }]}
              >
                <Input 
                  style={{height: '40px'}}
                  value={formData.address} 
                  placeholder="请输入房屋标题..." allowClear 
                  onChange={(e)=> this.onChangeFormData(e)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                label="房屋地址 :"
                rules={[{ required: true, message: '请输入房屋地址...' }]}
              >
                <Input 
                  style={{height: '40px'}}
                  value={formData.address} 
                  placeholder="请输入房屋地址..." allowClear 
                  onChange={(e)=> this.onChangeFormData(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="monthlyRent"
                label="月租 :"
                rules={[{ required: true, message: '请输入月租金...' }]}
              >
                <Input 
                  type={'number'}
                  style={{height: '40px'}}
                  value={formData.rent} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  addonAfter="RMB/Month" 
                  placeholder="请输入月租金..." 
                  allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaseState"
                label="是否已出租 :"
                rules={[{ required: true, message: '请输入房屋租赁状态' }]}
              >
                <Select 
                  value={formData.leaseState} 
                  onChange={(selection)=> this.selectOnChange(selection)}
                  placeholder="请选择房屋租赁状态:" 
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
                rules={[{ required: true, message: '请输入水费单价...' }]}
              >
                <Input 
                type={'number'}
                style={{height: '40px'}}
                value={formData.waterRate} 
                onChange={(e)=> this.onChangeFormData(e)}
                addonAfter="RMB/Litre" placeholder="请输入水费单价..." allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="electricityRate"
                label="电费单价 :"
                rules={[{ required: true, message: 'Please enter ElectricityRate' }]}
              >
                <Input 
                  type={'number'}
                  style={{height: '40px'}}
                  value={formData.electricityRate} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  addonAfter="RMB/Kilowatt" placeholder="请输入电费单价..." allowClear />
              </Form.Item>
            </Col>
            {
              isRented ? null : 
              (
                <Col span={12}>
                  <Form.Item
                    name="renterName"
                    label="租客名字 :"
                    rules={[{ required: true, message: 'Please enter RenterName' }]}
                  >
                    <Input 
                      style={{height: '40px'}}
                      value={formData.renterName} 
                      onChange={(e)=> this.onChangeFormData(e)}
                      placeholder="请输入租客名字..." allowClear />
                  </Form.Item>
                </Col>
              )
            }
            {
              isRented ? null : 
              (
                <Col span={12}>
                  <Form.Item
                    name="renterPhone"
                    label="租客电话 :"
                    rules={[{ required: true, message: 'Please enter RenterPhone' }]}
                  >
                    <Input 
                      style={{height: '40px'}}
                      value={formData.renterPhone} 
                      onChange={(e)=> this.onChangeFormData(e)}
                      placeholder="请输入租客电话..." allowClear />
                  </Form.Item>
                </Col>
              )
            }
            {
              isRented ? null : 
              (
                <Col span={12}>
                  <Form.Item
                    name="electricityUsed"
                    label="用电量 :"
                    rules={[{ required: true, message: 'Please enter RenterName' }]}
                  >
                    <Input 
                      type={'number'}
                      style={{height: '40px'}}
                      value={formData.electricityUsed} 
                      onChange={(e)=> this.onChangeFormData(e)}
                      placeholder="请输入用电量..." allowClear />
                  </Form.Item>
                </Col>
              )
            }
            {
              isRented ? null : 
              (
                <Col span={12}>
                  <Form.Item
                    name="waterUsed"
                    label="用水量 :"
                    rules={[{ required: true, message: 'Please enter RenterName' }]}
                  >
                    <Input 
                      type={'number'}
                      style={{height: '40px'}}
                      value={formData.waterUsed} 
                      onChange={(e)=> this.onChangeFormData(e)}
                      placeholder="请输入用水量..." allowClear />
                  </Form.Item>
                </Col>
              )
            }
            <Col span={12}>
              <Form.Item
                name="houseArea"
                label="房屋面积 :"
                rules={[{ required: true, message: 'Please enter RenterPhone' }]}
              >
                <Input 
                  style={{height: '40px'}}
                  value={formData.houseArea} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="请输入房屋面积..." allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="floor"
                label="房屋楼层 :"
                rules={[{ required: true, message: 'Please enter RenterPhone' }]}
              >
                <Input 
                  style={{height: '40px'}}
                  value={formData.floor} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="请输入房屋楼层..." allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="houseToward"
                label="房屋朝向 :"
                rules={[{ required: true, message: 'Please enter RenterPhone' }]}
              >
                <Input 
                  style={{height: '40px'}}
                  value={formData.houseToward} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="请输入房屋朝向..." allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="houseLayout"
                label="房屋布局 :"
                rules={[{ required: true, message: 'Please enter RenterPhone' }]}
              >
                <Input 
                  style={{height: '40px'}}
                  value={formData.houseLayout} 
                  onChange={(e)=> this.onChangeFormData(e)}
                  placeholder="请输入房屋布局..." allowClear />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tag"
                label="房屋标签 :"
                rules={[{ required: true, message: 'Please select tag' }]}
              >
                <Select
                  mode="multiple"
                  value={formData.tag}
                  showArrow
                  style={{float:  'left', marginRight: '20px', width: '100%'}}
                  allowClear={true}
                  placeholder="请选择房屋标签:"
                  tagRender={tagRender}
                  onChange={(selection) => this.selectOnChange(selection)}
                  options={tagChildren}
                >
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="houseFacility"
                label="房屋设备列表 :"
                rules={[{ required: true, message: 'Please select tag' }]}
              >
                <Transfer
                  dataSource={dataSource}
                  showSearch
                  filterOption={this.filterOption}
                  targetKeys={targetKeys}
                  onChange={this.handleChange}
                  onSearch={this.handleSearch}
                  render={item => item.title}
                />
              </Form.Item>
            </Col>
          </Row>
 
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="houseDescription"
                label="房屋描述 :"
                rules={[
                  {
                    required: true,
                    message: 'please enter url houseDescription',
                  },
                ]}
              >
                <Input.TextArea 
                  value={formData.houseDescription}
                  onChange={(e)=> this.onChangeFormData(e)}
                  rows={4} placeholder="请输入房屋描述..." allowClear/>
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
                  name="vrImg"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url Illustrations',
                    },
                  ]}
                >
                  <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    action={''}
                    listType="picture-card"
                    fileList={vrFileList}
                    onPreview={this.handlePreview}
                    onChange={this.vrImgHandleChange}
                  >
                    { vrFileList.length === 1 ? null : uploadButton }
                  </Upload>
                </Form.Item>
                <Modal
                  visible={vrPreviewVisible}
                  title={vrPreviewTitle}
                  footer={null}
                  onCancel={this.handleVrCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={vrPreviewImage} />
                </Modal>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="房屋轮播图 :"
                rules={[
                  {
                    required: true,
                    message: '请上传轮播图素材',
                  },
                ]}
              >
                <Form.Item
                style={{margin: 0}}
                  name="carouselImg"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url Illustrations',
                    },
                  ]}
                >
                  <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={carouselFileList}
                    onPreview={this.handlecPreview}
                    onChange={this.carouselImgHandleChange}
                  >
                    {carouselFileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>
                <span style={{ color: '#aaaaaa'}}>图片顺序为轮播图顺序，务必上传最少一张图片。</span>
                <Modal
                  visible={carouselPreviewVisible}
                  title={carouselPreviewTitle}
                  footer={null}
                  onCancel={this.handleCarouselCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={carouselPreviewImage} />
                </Modal>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
