import {
  HomeTwoTone,
  BankTwoTone,
  FundTwoTone,
  GoldTwoTone,
  IdcardTwoTone,
  PieChartTwoTone,
  SettingTwoTone,
  ShopTwoTone,
  MessageTwoTone
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
    path: '/system-management',
    value: '1',
    icon: SettingTwoTone
  },
  {
    label: '房源管理',
    value: '2',
    children: [
      { label: '楼栋信息', path: '/building-management', value: '2-1', icon: ShopTwoTone  },
      { label: '房屋管理', path: '/house-management', value: '2-2', icon: BankTwoTone },
    ],
    icon: BankTwoTone
  },
  { label: '租赁详情', 
    path: '/rent-details', 
    value: '3',
    icon: FundTwoTone
  },
  { label: '广告管理', 
    path: '/advertising-management', 
    value: '4',
    icon: GoldTwoTone
  },
  { label: '认证中心', 
    path: '/certification-center', 
    value: '5',
    icon: IdcardTwoTone
  },
  { label: '数据分析', 
    path: '/data-analysis', 
    value: '6',
    icon: PieChartTwoTone
  },
  { label: '房价详情', 
    path: '/price-details', 
    value: '7',
    icon: FundTwoTone
  },
  { label: '留言板', 
    path: '/chet-message', 
    value: '8',
    icon: MessageTwoTone 
  },
];

export default menuArr;