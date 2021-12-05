const menuArr = [
  {
    label: '首页',
    path: '/',
    value: '0'
  },
  {
    label: '系统管理',
    path: '/system-management',
    value: '1'
  },
  {
    label: '房源管理',
    value: '2',
    children: [
      { label: '楼栋信息', path: '/building-management', value: '2-0' },
      { label: '房屋管理', path: '/house-management', value: '2-1' },
    ],
  },
  { label: '租赁详情', 
    path: '/rent-details', 
    value: '3' 
  },
  { label: '广告管理', 
    path: '/advertising-management', 
    value: '4' 
  },
  { label: '认证中心', 
    path: '/certification-center', 
    value: '5' 
  },
  { label: '数据分析', 
    path: '/data-analysis', 
    value: '6' 
  },
  { label: '房价详情', 
    path: '/price-details', 
    value: '7' 
  },
];

export default menuArr;