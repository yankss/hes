import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/certification-center',
    component: React.lazy(() => import('../../pages/CertificationCenter/index'))
  }
]