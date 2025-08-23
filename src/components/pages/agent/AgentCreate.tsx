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
} from '@/components/ui/card';
import { useMuntahaDrop } from 'react-muntaha-uploader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectInput from '../../ui/SelectInput';
import { Button } from '../../ui/button';
import { Camera, Loader, X } from 'lucide-react';
import Image from 'next/image';
import { useAgentCreateMutation } from '../../../lib/features/services/adminControl/adminControllApi';
import { toast } from 'sonner';

const agentCreateSchema = z
  .object({
    img: z
      .custom<File>((file) => file instanceof File, 'Image is required')
      .refine(
        (file) => file.type.startsWith('image/'),
        'Only image files are allowed (jpg, png, etc.)',
      ),
    familyName: z.string().trim().min(2).max(50),
    givenName: z.string().trim().min(2).max(50),
    phone: z.string().trim().min(6).max(20),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
          'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
      }),
    passwordConfirm: z.string(),

    address: z.object({
      addressLine1: z.string().trim().min(5).max(100),
      addressLine2: z.string().trim().max(100).optional().or(z.literal('')),
      city: z.string().trim().min(2).max(60),
      stateDivision: z.string().trim().min(2).max(50),
      zipCode: z.string().trim().min(4).max(10),
      landmark: z.string().trim().max(100).optional().or(z.literal('')),
    }),

    vehicleType: z.string().trim().min(2).max(30),
    vehicleNumber: z.string().trim().min(3).max(20),
    licenseNumber: z.string().trim().min(5).max(30),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

const AgentCreate = ({ token }: { token: string }) => {
  const form = useForm<z.infer<typeof agentCreateSchema>>({
    resolver: zodResolver(agentCreateSchema),
    mode: 'onChange',
    defaultValues: {
      familyName: '',
      givenName: '',
      phone: '',
      vehicleType: '',
      vehicleNumber: '',
      licenseNumber: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        stateDivision: '',
        zipCode: '',
        landmark: '',
      },
      password: '',
      passwordConfirm: '',
    },
  });

  const { getRootProps, getInputProps, files, onDelete } = useMuntahaDrop({
    accept: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'image/avif',
      'image/heic',
    ],
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (file: File | null) => {
      if (file) {
        form.setValue('img', file);
      }
    },
  });

  const [agentCreate, { isLoading }] = useAgentCreateMutation();

  async function onSubmit(data: z.infer<typeof agentCreateSchema>) {
    const formData = new FormData();
    formData.append('img', data.img);
    formData.append('token', token);
    formData.append('data', JSON.stringify(data));

    await toast.promise(agentCreate(formData).unwrap(), {
      loading: 'Creating product...',
      success: (res) => {
        window.location.href = '/sign-in';
        return res?.message;
      },
      error: (err) => err?.data?.message,
    });
  }

  return (
    <section>
      <div className="container max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Create your agent account</CardTitle>
            <CardDescription>
              Fill out all the required information below to register a new
              delivery agent. Include personal details, contact info, vehicle
              information, and a profile picture. Make sure passwords match and
              all fields are accurate for smooth onboarding.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div
                    className="size-20 rounded-full border border-primary mx-auto flex items-center justify-center"
                    {...getRootProps()}
                  >
                    {files ? (
                      <div className="size-full relative rounded-full">
                        <Image
                          src={URL.createObjectURL(files)}
                          alt="Profile image"
                          width={100}
                          height={100}
                          className="size-full object-cover rounded-full"
                          priority
                        />
                        <Button
                          variant="destructive"
                          className=" absolute top-0 right-0 size-6 z-50"
                          type="button"
                          onClick={() => onDelete()}
                        >
                          <X />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <input {...getInputProps()} />
                        <div>
                          <Camera className="size-10" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-6 grid-cols-2">
                    <FormField
                      control={form.control}
                      name="familyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="givenName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <FormControl>
                            <SelectInput
                              options={[
                                { value: 'Bike', label: 'Bike' },
                                { value: 'Car', label: 'Car' },
                                { value: 'Van', label: 'Van' },
                                { value: 'Truck', label: 'Truck' },
                                { value: 'Other', label: 'Other' },
                              ]}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address 1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address 2</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.stateDivision"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State Division</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.landmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landmark</FormLabel>
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Confirm</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button disabled={isLoading}>
                    {isLoading && <Loader className="animate-spin" />}
                    Create your agent account
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

export default AgentCreate;
