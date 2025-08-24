'use client';

import React from 'react';
import ResetPassword from '../../../../components/auth/ResetPassword';

const ResetPasswordPage = ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const resolvedParams = React.use(params);

  return <ResetPassword token={resolvedParams.token} />;
};

export default ResetPasswordPage;
