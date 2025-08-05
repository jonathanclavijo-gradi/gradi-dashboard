import { ActionFunction, Form, useActionData } from "react-router-dom";
import { createUserSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (email == '' || password == '') {
    return {
      error: "Todos los campos son requeridos"
    }
  }

  if (email == 'admin@test123.com' && password == '123456') {
    return createUserSession('user-123', '/dashboard');
  }

  return {
    error: 'Las credenciales son incorrectas. Intenta de nuevo!'
  }
}

export default function LoginPage() {
  const actionData = useActionData() as { error? : string };

  return (
    <section className="min-h-screen flex items-center p-10 justify-start">
      <div className="w-max items-center p-5 rounded-2xl shadow-2xl m-auto h-full backdrop-blur-md bg-white/40">
        <div className="space-y-3">
          <h1 className="font-semibold text-2xl">Bonjour!</h1>
          <p className="text-gray-500 text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, atque!</p>                    

          <Form method="post" className="space-y-4">
            <div className="flex flex-col gap-5 mt-5">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-500">Correo</label>
                <input type="email" 
                  name="email"
                  id="email"
                  className="text-black mt-1 block w-full border border-gray-100 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm text-gray-500">Contraseña</label>
                <input type="password" 
                  name="password"
                  id="password"
                  className="text-black mt-1 block w-full border border-gray-100 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {actionData?.error && (
                <div><span className="text-red-600 text-sm">{actionData.error}</span></div>
              )}
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Iniciar sesion
              </button>
            </div>
          </Form>          
        </div>
      </div>
    </section>
  )
}