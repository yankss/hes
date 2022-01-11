import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/landlord-management',
    component: React.lazy(() => import('../../pages/SystemManagement/LandlordManagement/index'))
  },
  {
    path: '/renter-management',
    component: React.lazy(() => import('../../pages/SystemManagement/RenterManagement/index'))
  },
  {
    path: '/prospectiveCustomer-management',
    component: React.lazy(() => import('../../pages/SystemManagement/ProspectiveCustomerManagement/index'))
  }
]