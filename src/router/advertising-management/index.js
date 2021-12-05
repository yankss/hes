import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/advertising-management',
    component: React.lazy(() => import('../../pages/AdvertisingManagement/index'))
  }
]