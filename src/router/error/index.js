import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '*',
    component: React.lazy(() => import('../../pages/Error/index'))
  }
]