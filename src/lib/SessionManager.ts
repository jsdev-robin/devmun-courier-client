import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies, headers } from 'next/headers';
import 'server-only';

class SessionManager {
  cookieName: string;
  maxAge: number;
  rememberMe: boolean;

  constructor(
    cookieName: string = 'session',
    maxAgeDays: number = 7,
    rememberMe: boolean = true,
  ) {
    this.cookieName = cookieName;
    this.maxAge = maxAgeDays * 24 * 60 * 60 * 1000;
    this.rememberMe = rememberMe;
  }

  encrypt = async (
    payload: JWTPayload,
    key: string | undefined,
    expiresAt: Date,
  ) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(new TextEncoder().encode(key));
  };

  decrypt = async (
    session: string | undefined = '',
    key: string | undefined,
  ) => {
    try {
      const { payload } = await jwtVerify(
        session,
        new TextEncoder().encode(key),
        {
          algorithms: ['HS256'],
        },
      );
      return payload;
    } catch {
      console.log('Failed to verify session');
    }
  };

  deleteSession = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  };

  getIP = async () => {
    return (
      (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ??
      'Unknown'
    );
  };

  getDevice = async () => {
    const ua = (await headers()).get('user-agent') || '';

    if (/mobile/i.test(ua)) return 'Mobile';
    if (/tablet/i.test(ua)) return 'Tablet';
    if (/iPad|PlayBook/.test(ua)) return 'Tablet';
    if (/Android/.test(ua) && !/mobile/i.test(ua)) return 'Tablet';
    if (/Macintosh|Windows|Linux/.test(ua)) return 'Desktop';

    return 'Unknown';
  };

  getBrowser = async () => {
    const ua = (await headers()).get('user-agent') || '';

    if (ua.includes('Firefox/')) return 'Firefox';
    if (ua.includes('Edg/') || ua.includes('Edge/')) return 'Edge';
    if (ua.includes('Chrome/') && !ua.includes('Edg/') && !ua.includes('OPR/'))
      return 'Chrome';
    if (
      ua.includes('Safari/') &&
      !ua.includes('Chrome/') &&
      !ua.includes('Chromium/')
    )
      return 'Safari';
    if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';

    return 'Unknown';
  };
}

export default SessionManager;
