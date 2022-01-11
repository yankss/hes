import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/contract-management',
    component: React.lazy(() => import('../../pages/ContractManagement/index'))
  }
]