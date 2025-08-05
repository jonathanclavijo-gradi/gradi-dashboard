import { LoaderFunction, useLoaderData, Form } from 'react-router-dom';
import { logout, requireUserSession } from "~/session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const session = await requireUserSession(request);
  return {
    userId: session.get('userId')
  }
}

export const action: LoaderFunction = async ({ request }) => {
  return logout(request);
}

export default function DashboardLayout() {
  const { userId } = useLoaderData() as { userId: string };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <h1 className="text-xl">Dashboard</h1>    
      <h1 className="text-3xl text-black font-bold">Bienvenido al dashboard, {userId}</h1>
      <Form method='post'>
        <button className='bg-red-600 text-white px-4 py-2 rounded'>
          Cerrar session
        </button>
      </Form>
    </div>
  )
}