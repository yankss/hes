import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/renter-management',
    component: React.lazy(() => import('../../pages/SystemManagement/RenterManagement/index'))
  }
]