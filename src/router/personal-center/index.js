import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/favorites',
    component: React.lazy(() => import('../../pages/PersonalCenter/Favorites/index'))
  },
  {
    path: '/personalSetting',
    component: React.lazy(() => import('../../pages/PersonalCenter/PersonalSetting/index'))
  }
]