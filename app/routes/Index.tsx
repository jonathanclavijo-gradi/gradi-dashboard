import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await requireUserSession(request);

  console.log(session);

  return json({
    userId: session.get("userId")
  });
}

export default function DashboardHomePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido, usuario {data.userId}</h1>
    </div>
  );
}
