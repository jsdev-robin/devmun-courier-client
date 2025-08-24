'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { forgotPaswordSchema } from '../../validations/auth';
import { useForgotPasswordMutation } from '../../lib/features/services/auth/authApi';
import { cn } from '../../lib/utils';

const ForgotPassword = () => {
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();
  const form = useForm<z.infer<typeof forgotPaswordSchema>>({
    resolver: zodResolver(forgotPaswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  async function onSubmit(data: z.infer<typeof forgotPaswordSchema>) {
    await toast.promise(
      forgotPassword(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Sending password reset link...',
        success: (res) => res?.message,
        error: (err) => err?.data?.message,
      },
    );
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [form, isSuccess]);

  return (
    <section className="w-full">
      <div className="container max-w-md ">
        <div className="grid gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-poppins">
                Forgot your password?
              </CardTitle>
              <CardDescription>
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
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

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader className="animate-spin" />}
                        Send Reset Link
                      </Button>
                      <Link
                        href="/sign-in"
                        className={cn(buttonVariants({ variant: 'link' }))}
                      >
                        <ChevronLeft />
                        Return to sign in
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

export default ForgotPassword;
