import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/house-management',
    component: React.lazy(() => import('../../pages/HouseManagement/index'))
  }
]