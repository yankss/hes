import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/chet-message',
    component: React.lazy(() => import('../../pages/ChetMessage/index'))
  },
  // {
  //   path: '/chet-message/message-detail',
  //   component: React.lazy(() => import('../../pages/ChetMessage/MessageDetail/index'))
  // }
]