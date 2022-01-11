import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/login',
    component: React.lazy(() => import('../../pages/Login/index'))
  }
]