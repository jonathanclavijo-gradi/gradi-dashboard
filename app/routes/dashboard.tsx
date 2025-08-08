import { LoaderFunction, useLoaderData, Form } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { logout, requireUserSession } from "~/session.server"
import { kpis } from '../data/kips';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartPieSimple } from '~/components/ui/ChartPieSimple';
import RecentUsersTable from '~/components/RecentUsersTable';

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
    <div className='min-h-screen bg-zinc-900 text-white p-5 space-y-5'>
      <div className='flex gap-5 justify-between'>
        <h1 className='text-2xl'>Bienvenido, usuario {userId}</h1>
        <Form method='post'>
          <Button variant={'ghost'}>Cerrar sesion</Button>
        </Form>
      </div>
      <div className='p-5 grid grid-cols-4 gap-3'>
        {kpis && kpis.map((kpi, index) => (
          <Card className='w-full bg-gray-300 rounded-2xl p-0 border-0 shadow-lg' 
            key={index}
          >
            <CardHeader>
              <CardTitle className='text-lg'>{kpi.label}</CardTitle>
              <CardDescription className='text-md'>{kpi.value}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPieSimple />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='w-full h-full p-5'>
        <RecentUsersTable />
      </div>
    </div>
  )
}