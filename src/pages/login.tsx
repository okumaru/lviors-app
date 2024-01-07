import { useState } from "react"
import { NavLink, redirect, useNavigate } from "react-router-dom"

import Toast from "../components/toast"
import type { login } from "../@types/login"
import { loginUser } from "../utils/user"
import { getUser, getToken } from "../utils/user";

export async function loader() {

  const user = await getUser();
  const token = await getToken();

  if (user || token)
    return redirect(`/`)

  return { user };
}

type handlerProps = login

const loginHandler = async (
  data: handlerProps, 
  callback: (status: boolean) => void
) => {
  try {
    
    if (
      !data.username ||
      !data.password
    ) throw new Error("Some field is empty!")

    await loginUser(data);

    return callback(true)

  } catch (e) {
    if (e instanceof Error)
      console.error(e.message)

    return callback(false)
  }
}

export default function () {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<handlerProps>({
    username: "", 
    password: ""
  })

  return <div className="flex w-full justify-center items-center">
    <Toast 
      open={open} 
      setOpen={setOpen} 
      title="Something went wrong!"
      description="Please make sure username and password is valid."
    />
    <div className="w-80 space-y-4">
      <h1 className="text-center text-4xl font-black text-gray-600">
        Login User
      </h1>
      <div className="grid gap-2">
        <fieldset className="grid gap-1">
          <label className="text-sm text-gray-600" htmlFor="username">
            Username
          </label>
          <input 
            type='text' 
            className="border rounded-md border-slate-700 box-border w-full" 
            id="username" 
            onChange={(e) => setData(v => ({...v, username: e.target.value}))}
          />
        </fieldset>
        <fieldset className="grid gap-1">
          <label className="text-sm text-gray-600" htmlFor="password">
            Password
          </label>
          <input 
            type='password' 
            className="border rounded-md border-slate-700 box-border w-full" 
            id="password" 
            onChange={(e) => setData(v => ({...v, password: e.target.value}))}
          />
        </fieldset>
        <fieldset className="flex justify-end">
          <NavLink
            to={`/register`}
            className="text-sm underline text-neutral-500"
          >
            Register
          </NavLink>
        </fieldset>
        <fieldset className="flex justify-center">
          <button 
            className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-cyan-700 bg-cyan-100"
            onClick={() => loginHandler(data, (status) => {
              if (!status) 
                setOpen(true)

              if (status) 
                navigate('/')
            })}
          >
            Login
          </button>
        </fieldset>
      </div>
    </div>
  </div>
}