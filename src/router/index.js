import React from "react";
import advertisingManagement from './advertising-management';
import buildingManagement from './building-management';
import certificationCenter from './certification-center';
import dataAnalysis from './data-analysis';
import priceDetails from './price-details';
import rentDetails from './rent-details';
import systemManagement from './system-management';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('../pages/Home/index'))
  },
  ...advertisingManagement,
  ...buildingManagement,
  ...certificationCenter,
  ...dataAnalysis,
  ...priceDetails,
  ...rentDetails,
  ...systemManagement
]