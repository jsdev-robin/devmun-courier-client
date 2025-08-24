'use client';

import React, { useState } from 'react';
import { CardDescription, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Typography from '@/components/ui/typography';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface TwoFactorSetupGuideProps {
  isLoading: boolean;
  data?: {
    secret: string;
    otpauth_url: string;
    qrCodeDataUrl: string;
  };
}

const TwoFactorSetupGuide: React.FC<TwoFactorSetupGuideProps> = ({
  isLoading,
  data,
}) => {
  return (
    <>
      <CardDescription>
        Authenticator apps and browser extensions like{' '}
        <Link
          href="https://support.1password.com/one-time-passwords/?windows"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          1Password
        </Link>
        ,{' '}
        <Link
          href="https://www.authy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Authy
        </Link>
        ,{' '}
        <Link
          href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Microsoft Authenticator
        </Link>{' '}
        ,{' '}
        <Link
          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Google Authenticator
        </Link>
        ,{' '}
        <Link
          href="https://apps.apple.com/app/google-authenticator/id388497605"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Google Authenticator in Apple store
        </Link>{' '}
        etc. generate one-time passwords that are used as a second factor to
        verify your identity when prompted during sign-in.
      </CardDescription>
      <div>
        <CardTitle>Scan the QR code</CardTitle>
        <CardDescription>
          Use an authenticator app or browser extension to scan.{' '}
          <Link href="/" className="underline">
            Learn more about enabling 2FA.
          </Link>
        </CardDescription>
      </div>
      {isLoading ? (
        <Skeleton className="size-48 rounded-md" />
      ) : (
        <div className="bg-white inline-block rounded-md">
          {data?.qrCodeDataUrl && (
            <Image
              src={data?.qrCodeDataUrl}
              alt="qr"
              width={208}
              height={208}
              className="size-52 rounded-md"
              priority
            />
          )}
        </div>
      )}
      <CardDescription>
        <SetupKey secretKey={data?.secret ?? ''} />
      </CardDescription>
    </>
  );
};

const SetupKey = ({ secretKey }: { secretKey: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (url: string | undefined) => {
    navigator.clipboard.writeText(url ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger>
          Unable to scan? You can use the{' '}
          <strong className="text-blue-500 underline">Setup key</strong> to
          manually configure your authenticator app.
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Your two-factor secret</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>
                Use the setup key below to manually configure your authenticator
                app if you’re unable to scan the QR code.
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>

          <div className="flex items-center gap-6 justify-between">
            <Typography variant="xs">{secretKey}</Typography>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleCopy(secretKey)}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TwoFactorSetupGuide;
