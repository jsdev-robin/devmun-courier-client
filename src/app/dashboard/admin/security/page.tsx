import React from 'react';
import AdminAccount2FA from '../../../../components/dashboard/admin/pages/security/AdminAccount2FA';
import AdminAccountSigninHistory from '../../../../components/dashboard/admin/pages/security/AdminAccountSigninHistory';

const AdminAccountSecurityPage = () => {
  return (
    <>
      <AdminAccount2FA />
      <AdminAccountSigninHistory />
    </>
  );
};

export default AdminAccountSecurityPage;
