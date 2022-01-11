import React from "react";
import contractManagement from './contract-management';
import buildingManagement from './building-management';
import certificationCenter from './certification-center';
import dataAnalysis from './data-analysis';
import systemManagement from './system-management';
import chetMessage from "./chet-message";
import errorPage from  "./error"
import personalCenter from "./personal-center";
import receiptManagement from "./receipt-management";
import login from './login'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('../pages/Home/index'))
  },
  ...contractManagement,
  ...buildingManagement,
  ...certificationCenter,
  ...dataAnalysis,
  ...chetMessage,
  ...systemManagement,
  ...errorPage,
  ...personalCenter,
  ...receiptManagement,
  ...login
]