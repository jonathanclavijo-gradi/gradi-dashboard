import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import styles from './tailwind.css';
import { LinksFunction } from "@remix-run/react/dist/routeModules";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>Gradi Dashboard</title>
        <link rel="icon" href="data:image/x-icon;base64,AA"/>
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-white">
        <h1 className="text-xl">Dashboard</h1>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}