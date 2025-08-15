import type { ActionFunction } from "@remix-run/node";
import { redirect } from '@remix-run/node';
import { Form, useActionData } from "@remix-run/react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { prisma } from '~/db.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();

  if (!name || !email) {
    return {
      error: 'Todos los campos son requeridos'
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Este correo ya esta registrado" }
  }

  await prisma.user.create({
    data: { name, email }
  });

  return redirect('/list')
}

export default function UsersIndex() {
  const actionData = useActionData() as { error?: string };

  return (
    <div className="p-5 m-auto h-screen flex items-center justify-center bg-white/30">
      <div className="bg-zinc-100 p-5 w-1/3 flex flex-col backdrop-blur-md shadow-xl rounded-xl">
        <div className="space-y-2 mb-4">
          <h1 className="text-xl font-semibold">Crear un usuario nuevo</h1>
          <p className="text-sm text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, excepturi.</p>
          {actionData?.error && (
            <Alert variant={'default'} className="p-2 bg-transparent border border-red-500">
              <AlertTitle className="text-xs text-red-600">Error</AlertTitle>
              <AlertDescription className="text-xs text-red-600">
                { actionData.error }
              </AlertDescription>
            </Alert>
          )}
        </div>
        <Form method="post" className="space-y-3">
          <Input className="border-zinc-500" type="text" name="name" placeholder="Nombre"/>
          <Input className="border-zinc-500" type="email" name="email" placeholder="Email"/>
          <Button className="text-center flex justify-center m-auto w-full" type="submit">Crear usuario</Button>
        </Form>
      </div>
    </div>
  )
}