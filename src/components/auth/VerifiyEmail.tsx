'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { verifiyEmailSchema } from '../../validations/auth';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { RootState } from '../../lib/features/store';
import { useVerifyEmailMutation } from '../../lib/features/services/auth/authApi';

const VerifyEmail = () => {
  const { verifyToken } = useSelector((store: RootState) => store.auth);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const form = useForm<z.infer<typeof verifiyEmailSchema>>({
    resolver: zodResolver(verifiyEmailSchema),
    defaultValues: {
      otp: '',
    },
  });
  async function onSubmit(data: z.infer<typeof verifiyEmailSchema>) {
    await toast.promise(
      verifyEmail({
        otp: Number(data.otp),
        token: String(verifyToken),
      })
        .unwrap()
        .then((res) => {
          window.location.href = '/sign-in';
          return res;
        }),
      {
        loading: 'Verifying your account...',
        success: (res) => res?.message,
        error: (err) => err?.data?.message,
      },
    );
  }

  return (
    <section className="w-full">
      <div className="container max-w-md ">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-popotps">
              OTP Verification
            </CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your registered email or phone
              number.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>One-Time Password</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader className="animate-spin" />}
                    Complete Verification
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VerifyEmail;
