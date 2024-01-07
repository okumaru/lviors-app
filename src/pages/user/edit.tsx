import { useState } from "react"
import { useLoaderData } from "react-router-dom";

import Toast from "../../components/toast"
import ChangePassword from "../../components/change-password";
import { getUser, updateUser, changeUserPass } from "../../utils/user";
import type { user } from "../../@types/user";
import type { changePass } from "../../@types/change-pass";

export async function loader() {
  const user = await getUser();
  return { user };
}

type handlerProps = user

const editHandler = async (
  data: handlerProps, 
  callback: (status: boolean) => void
) => {
  try {

    await updateUser(data);
    callback(true)

  } catch (e) {
    if (e instanceof Error)
      console.error(e.message)

    return callback(false)
  }
}

const changePassHandler = async (
  data: changePass,
  callback: (status: boolean) => void
) => {
  try {

    console.log(data);
    await changeUserPass(data);
    callback(true)

  } catch (e) {
    if (e instanceof Error)
      console.error(e.message)

    return callback(false)
  }
}

type loader = {
  user: user
}

export default function () {
  const { user } = useLoaderData() as loader;

  const [openSuc, setOpenSuc] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  return <>
    <Toast 
      open={openErr} 
      setOpen={setOpenErr} 
      title="Something went wrong!"
      description="Please fill all field."
    />
    <Toast 
      open={openSuc} 
      setOpen={setOpenSuc} 
      title="Success!"
      description="Update user profile success."
    />
    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between ">
      <div>
        <h1 className="text-2xl font-black">
          Edit user profile.
        </h1>
        <p className="text-slate-500">Make changes to your profile here. Click save when you're done.</p>
      </div>
      <ChangePassword handler={(data) => changePassHandler(data, (status) => {
          setOpenSuc(status)
          setOpenErr(!status)
        })} 
      />
    </div>
    <div className="mt-8 flex flex-col gap-4">
      <fieldset className="flex flex-col md:flex-row gap-1 md:gap-5 md:items-center">
        <label className="box-border w-full md:w-[150px] text-sm md:text-right text-gray-600" htmlFor="name">
          Name
        </label>
        <input 
          type='text' 
          className="border rounded-md border-slate-700 box-border w-full" 
          id="name" 
          defaultValue={user.name}
          onChange={(e) => user.name = e.target.value}
        />
      </fieldset>
      <fieldset className="flex flex-col md:flex-row gap-1 md:gap-5 md:items-center">
        <label className="box-border w-full md:w-[150px] text-sm md:text-right text-gray-600" htmlFor="username">
          Username
        </label>
        <input 
          type='text' 
          className="border rounded-md border-slate-700 box-border w-full" 
          id="username" 
          defaultValue={user.username}
          onChange={(e) => user.username = e.target.value}
        />
      </fieldset>
      <fieldset className="flex flex-col md:flex-row gap-1 md:gap-5 md:items-center">
        <label className="box-border w-full md:w-[150px] text-sm md:text-right text-gray-600" htmlFor="email">
          Email
        </label>
        <input 
          type='text' 
          className="border rounded-md border-slate-700 box-border w-full" 
          id="email" 
          defaultValue={user.email}
          onChange={(e) => user.email = e.target.value}
        />
      </fieldset>
      {/* <fieldset className="flex flex-col md:flex-row gap-1 md:gap-5 md:items-center">
        <label className="box-border w-full md:w-[150px] text-sm md:text-right text-gray-600" htmlFor="photo">
          Photo
        </label>
        <input type='file' className="shadow-none box-border w-full" id="photo" />
      </fieldset> */}
      <fieldset className="flex justify-end">
        <button 
          className="text-base font-medium px-4 py-2 rounded-md text-emerald-700 bg-emerald-100"
          onClick={() => editHandler(user, (status) => {
            setOpenSuc(status)
            setOpenErr(!status)
          })}
        >
          Save changes
        </button>
      </fieldset>
      
    </div>
  </>
}