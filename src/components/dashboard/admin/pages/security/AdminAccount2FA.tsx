import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const AdminAccount2FA = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-factor Authentication (2FA)</CardTitle>
        <CardDescription>
          When turned on, anyone who tries to sign in from a new device or
          browser will need to verify that they have access to your account.{' '}
          <Link href="/" className="underline">
            Learn more
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between flex-wrap gap-6">
          <Typography weight="medium">
            Two-factor Authentication: Off
          </Typography>
          <div className="flex items-center flex-wrap gap-4">
            <Badge className="bg-yellow-500 text-black">
              Strongly recommended
            </Badge>
            <Link
              href="/dashboard/admin/security/twofactor/setup"
              className={cn(buttonVariants({ size: 'sm' }))}
            >
              Turn on 2FA
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAccount2FA;
