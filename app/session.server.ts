import { createCookieSessionStorage, LoaderFunctionArgs, redirect } from '@remix-run/node';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['my-super-secret'],
    secure: process.env.NODE_ENV === 'production'
  }
})

export async function getSession (request: Request) {
  return sessionStorage.getSession(request.headers.get('Cookie'));
}

export async function requireUserSession(request: Request) {
  const session = await getSession(request);
  const userId = session.get('userId');

  if (!userId) {
    throw redirect('/login');
  }

  return session;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session)
    }
  })
}

export async function logout(request: Request) {
  const session = await getSession(request);
  
  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })
}