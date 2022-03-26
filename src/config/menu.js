import {
  HomeTwoTone,
  BankTwoTone,
  IdcardTwoTone,
  PieChartTwoTone,
  SettingTwoTone,
  MessageTwoTone,
  CrownTwoTone,
  HeartTwoTone,
  StarTwoTone,
  ContainerTwoTone,
  ScheduleTwoTone,
} from '@ant-design/icons';
const menuArr = [
  {
    label: '首页',
    path: '/',
    value: '0',
    icon: HomeTwoTone
  },
  {
    label: '系统管理',
    value: '1',
    icon: SettingTwoTone,
    children: [
      { label: '潜客管理', path: '/prospectiveCustomer-management', value: '1-1', icon: HeartTwoTone },
      { label: '租客管理', path: '/renter-management', value: '1-2', icon: CrownTwoTone },
      { label: '房东管理', path: '/landlord-management', value: '1-3', icon: CrownTwoTone },

    ]
  },
  {
    label: '房屋管理',
    value: '2',
    path: '/house-management',
    icon: BankTwoTone
  },
  { label: '合约管理', 
    path: '/contract-management', 
    value: '4',
    icon: ContainerTwoTone
  },
  { label: '收据管理', 
    path: '/receipt_management', 
    value: '10',
    icon: ScheduleTwoTone
  },
  { label: '认证中心', 
    path: '/certification-center', 
    value: '5',
    icon: IdcardTwoTone
  },
  { label: '数据分析', 
    value: '6',
    icon: PieChartTwoTone,
    path: '/data-analysis',
    // children: [
    //   { label: '租赁详情', path: '/rent-details', value: '6-1', icon: FundTwoTone},
    //   { label: '房价详情', path: '/price-details', value: '6-2', icon: FundTwoTone },

    // ]
  },
  { label: '留言板', 
    path: '/chet-message', 
    value: '8',
    icon: MessageTwoTone 
  },
  {
    label: '个人中心',
    value: '9',
    icon: SettingTwoTone,
    children: [
      { label: '收藏夹', path: '/favorites', value: '9-1', icon: StarTwoTone},
      { label: '个人设置', path: '/personalSetting', value: '9-2', icon: CrownTwoTone },

    ]
  },
];

export default menuArr;