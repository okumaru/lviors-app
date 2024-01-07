import { useState } from "react"
import { NavLink, redirect } from "react-router-dom"
import Toast from "../components/toast"
import type { user } from "../@types/user"
import { registerUser } from "../utils/user"
import { getUser, getToken } from "../utils/user";

export async function loader() {

  const user = await getUser();
  const token = await getToken();

  if (user || token)
    return redirect(`/`)

  return { user };
}

type handlerProps = user & {
  conf_pass?: string
}

const registerHandler = async (
  data: handlerProps, 
  callback: (status: boolean) => void
) => {
  try {
    
    if (
      !data.name ||
      !data.username ||
      !data.email ||
      !data.password ||
      !data.conf_pass
    ) throw new Error("Some field is empty!")

    if (data.password !== data.conf_pass)
      throw new Error("Password not equal with confirmation password!")

    await registerUser(data);

    // return redirect(`/login`); // PR: blm tau knp tidak jalan.
    return window.location.href = "/login"

  } catch (e) {
    if (e instanceof Error)
      console.error(e.message)

    return callback(false)
  }
}

export default function () {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<handlerProps>({
    name: "", 
    username: "", 
    email: "", 
    password: ""
  })

  return <div className="flex w-full justify-center items-center">
    <Toast 
      open={open} 
      setOpen={setOpen} 
      title="Something went wrong!"
      description="Please fill all field and make sure password same with confirmation password."
    />
    <div className="w-80 space-y-4">
      <h1 className="text-center text-4xl font-black text-gray-600">
        Register User
      </h1>
      <div className="grid gap-2">
        <fieldset className="grid gap-1">
          <label className="text-sm text-gray-600" htmlFor="name">
            Name
          </label>
          <input
            type='text'
            className="border rounded-md border-slate-700 box-border w-full"
            id="name"
            onChange={(e) => setData(v => ({...v, name: e.target.value}))}
          />
        </fieldset>
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
          <label className="text-sm text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            type='email'
            className="border rounded-md border-slate-700 box-border w-full"
            id="email"
            onChange={(e) => setData(v => ({...v, email: e.target.value}))}
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
        <fieldset className="grid gap-1">
          <label className="text-sm text-gray-600" htmlFor="conf_pass">
            Confirm Password
          </label>
          <input
            type='password'
            className="border rounded-md border-slate-700 box-border w-full"
            id="conf_pass"
            onChange={(e) => setData(v => ({...v, conf_pass: e.target.value}))}
          />
        </fieldset>
        <fieldset className="flex justify-end">
          <NavLink
            to={`/login`}
            className="text-sm underline text-neutral-500"
          >
            Login
          </NavLink>
        </fieldset>
        <fieldset className="flex justify-center">
          <button 
            className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-cyan-700 bg-cyan-100"
            onClick={() => registerHandler(data, (status) => {
              if (!status) setOpen(true)
            })}
          >
            Register
          </button>
        </fieldset>
      </div>
    </div>
  </div>
}