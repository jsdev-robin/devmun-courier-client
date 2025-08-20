'use client';

import {
  MetaIcon,
  GoogleIcon,
  DiscordIcon,
  GithubIcon,
  XIcon,
} from '../../icons';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

const providers = [
  {
    name: 'Meta',
    Icon: MetaIcon,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/facebook`,
    label: 'Login with Meta',
  },
  {
    name: 'GitHub',
    Icon: GithubIcon,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github`,
    label: 'Login with GitHub',
  },
  {
    name: 'Discord',
    Icon: DiscordIcon,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`,
    label: 'Login with Discord',
  },
  {
    name: 'Google',
    Icon: GoogleIcon,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`,
    label: 'Login with Google',
  },
  {
    name: 'X',
    Icon: XIcon,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/twitter`,
    label: 'Login with X',
  },
];

const SocialAuth = () => {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <Separator className="shrink" />
        <span className="relative z-10 px-1.5 text-muted-foreground whitespace-nowrap">
          Or continue with
        </span>
        <Separator className="shrink" />
      </div>
      <div className="grid grid-cols-5 gap-3">
        {providers.map((provider, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => {
              window.location.href = provider.url;
            }}
          >
            <provider.Icon />
            <span className="sr-only">{provider.label}</span>
          </Button>
        ))}
      </div>
    </>
  );
};

export default SocialAuth;
