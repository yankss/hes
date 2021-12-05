import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/building-management',
    component: React.lazy(() => import('../../pages/HousingResourceManagement/BuildingManagement/index'))
  },
  {
    path: '/house-management',
    component: React.lazy(() => import('../../pages/HousingResourceManagement/HouseManagement/index'))
  }
]