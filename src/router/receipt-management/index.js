import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/receipt_management',
    component: React.lazy(() => import('../../pages/ReceiptManagement/index'))
  }
]