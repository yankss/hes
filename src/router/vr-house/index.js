import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/vr-house',
    component: React.lazy(() => import('../../pages/VRhouse/index'))
  },
]