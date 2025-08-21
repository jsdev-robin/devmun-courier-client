import { cookies } from 'next/headers';
import 'server-only';
import SessionManager from '../lib/SessionManager';

const utils = new SessionManager();

const getCustomerDal = async () => {
  const cookie = (await cookies()).get('xb82ef9')?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);
  return session ? { role: session.role } : {};
};

export default getCustomerDal;
