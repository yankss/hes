import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/login',
    exact: true,
    component: React.lazy(() => import('../../pages/Login/index'))
  }
]