import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { prisma } from "~/db.server";

type User = {
  id: number;
  name: string;
  email: string;
}

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany({
    orderBy: { id: 'asc' }
  })

  return json(users);
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  try {
    if (!id) return { error: "Invalid ID" }

    await prisma.user.delete({
      where: { id: Number(id) }
    })

    return json({
      type: 'success',
      message: 'User deleted successfully'
    })
  } catch (error) {
    return json({
      type: 'error',
      message: 'Failed to delete user'
    })
  }
}

export default function UserList() {
  const users = useLoaderData<User[]>();
  const actionData = useActionData<string>();

  return (
    <>
      <div className="h-screen p-5 bg-zinc-800 text-white">
        <div className="border-zinc-700 p-5 shadow-xl h-full overflow-auto">
          <h1 className="text-3xl font-semibold">Lista de usuarios</h1>
          <div className="grid grid-cols-4 items-center gap-5">
            {users && users.length > 0 ?
              users.map(({ name, email, id }, i) => (
                <Card className="bg-zinc-700 rounded-xl border-none text-white" key={i}>
                  <CardHeader>
                    <Avatar>
                      <AvatarFallback className="bg-slate-500">US</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div>
                        <h1>{name}</h1>
                        <p className="text-sm text-zinc-500">{email}</p>
                      </div>
                      <Form method="post">
                        <Input type="hidden" name="id" value={id} />
                        <Button variant={'ghost'}
                          className="text-red-500 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500"
                          type="submit">
                          Eliminar
                        </Button>
                      </Form>
                    </div>
                  </CardContent>
                </Card>
              ))
              : (
                <div className="h-screen w-full flex justify-center items-center">
                  <p>No hay usuarios registrados aun</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}