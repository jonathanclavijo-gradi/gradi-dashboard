import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from './tailwind.css';
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { ScrollRestoration } from "react-router-dom";
import { getSession } from "./session.server";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get('userId');  

  return json({});
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard App | Remix' },
    {
      property: 'og:title',
      content: 'Very Cool App'
    },
    {
      name: "description",
      content: 'This app is the best'
    }
  ]
}

export default function App() {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-zinc-400">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}