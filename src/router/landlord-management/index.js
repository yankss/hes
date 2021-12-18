import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/landlord-management',
    component: React.lazy(() => import('../../pages/SystemManagement/LandlordManagement/index'))
  }
]