import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/rent-details',
    component: React.lazy(() => import('../../pages/RentDetails/index'))
  }
]