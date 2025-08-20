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
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import SocialAuth from './particles/SocialAuth';
import { signinSchema } from '../../validations/auth';
import { useSigninMutation } from '../../lib/features/services/auth/authApi';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const SignIn = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: 'XLrewd875@',
      remember: false,
    },
  });
  async function onSubmit(data: z.infer<typeof signinSchema>) {
    await toast.promise(
      signin(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Signing in...',
        // success: (res) => {
        //   if (res.data.enable2fa) {
        //     window.location.href = '/sign-in/verify-2fa';
        //   } else {
        //     window.location.href =
        //       res.data.role === 'admin'
        //         ? '/dashboard/admin/overview'
        //         : '/dashboard/agent/overview';
        //   }
        //   return res?.message;
        // },
        error: (err) => err?.data?.message,
      },
    );
  }

  return (
    <section className="w-full">
      <div className="container max-w-md">
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-poppins">
                Welcome back
              </CardTitle>
              <CardDescription>
                Sign in to your account or continue with a social provider.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-between">
                        <FormField
                          control={form.control}
                          name="remember"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  id="remember"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor="remember"
                                className="text-sm font-normal"
                              >
                                Remember me
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader className="animate-spin" />}
                        Sign in
                      </Button>
                      <SocialAuth />
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{' '}
                      <Link
                        href="/sign-up"
                        className="underline underline-offset-4"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
