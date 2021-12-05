import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/system-management',
    component: React.lazy(() => import('../../pages/SystemManagement/index'))
  }
]