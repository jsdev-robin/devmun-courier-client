'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import {
  useGetSessionsQuery,
  useSignoutAllSessionMutation,
  useSignoutSessionMutation,
} from '../../../../../lib/features/services/auth/authApi';

const AdminAccountSigninHistory = () => {
  const { data } = useGetSessionsQuery();
  const [signoutSession, { isLoading }] = useSignoutSessionMutation();
  const [signoutAllSession, { isLoading: loading }] =
    useSignoutAllSessionMutation();

  const handleSessionOut = async (token: string) => {
    await toast.promise(signoutSession(token).unwrap(), {
      loading: 'Kicking that device out...',
      success: (res) => res?.message,
      error: (err) => err?.data?.message,
    });
  };

  const handleAllSessionOut = async () => {
    await toast.promise(signoutAllSession().unwrap(), {
      loading: 'Signing out from all devices...',
      success: (res) => res?.message,
      error: (err) => err?.data?.message,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review your sign-in history</CardTitle>
        <CardDescription>
          Make sure you recognise all recent sign-in activity for your account.
          You can sign out anywhere you’re still signed in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Browser/Device</TableHead>
              <TableHead>IP address</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {data?.data.sessions.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(new Date().getTime() -
                    new Date(entry.loggedInAt).getTime()) /
                    (1000 * 60 * 60 * 24) >=
                  1
                    ? new Date(entry.loggedInAt).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : formatDistanceToNow(new Date(entry.loggedInAt), {
                        addSuffix: true,
                      })}
                </TableCell>
                <TableCell>
                  {entry?.deviceInfo.browser} on {entry.deviceInfo.os}
                </TableCell>
                <TableCell>{entry.ip}</TableCell>
                <TableCell>
                  {entry.location.city}, {entry.location.country}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleSessionOut(entry.token)}
                    disabled={isLoading || !entry.status}
                    variant={'ghost'}
                  >
                    {entry?.status ? 'Sign out' : 'Signed out'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleAllSessionOut} disabled={loading} size="sm">
          {loading && <Loader className="animate-spin" />}
          Sign out from all devices
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminAccountSigninHistory;
