import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get('userId');

  if (!userId) {
    return redirect('/login');
  }

  return redirect('/dashboard');
}
