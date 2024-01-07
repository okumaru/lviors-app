import { useState } from "react"

import Toast from "../../components/toast"
import type { addPost } from "../../@types/add-post"
import { addUserPost } from "../../utils/post"

type handlerProps = addPost;

const addPostHandler = async (
  data: handlerProps,
  callback: (status: boolean) => void
) => {
  try {

    await addUserPost(data);
    return window.location.href = "/posts"

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
    caption: "",
    tags: "",
    photo: null
  })

  return <div className="space-y-6">
    <Toast 
      open={open} 
      setOpen={setOpen} 
      title="Something went wrong!"
      description="Please make sure all field not empty."
    />
    <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
      <div>
        <h1 className="text-2xl font-black">
          Add Post.
        </h1>
        <p className="text-slate-500">
          Share your post to your connected friend.
        </p>
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
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
        <label className="text-sm text-gray-600" htmlFor="caption">
          Caption
        </label>
        <input
          type='text'
          className="border rounded-md border-slate-700 box-border w-full"
          id="caption"
          onChange={(e) => setData(v => ({...v, caption: e.target.value}))}
        />
      </fieldset>
      <fieldset className="grid gap-1">
        <label className="text-sm text-gray-600" htmlFor="tags">
          Tags
        </label>
        <input
          type='text'
          className="border rounded-md border-slate-700 box-border w-full"
          id="tags"
          onChange={(e) => setData(v => ({...v, tags: e.target.value}))}
        />
      </fieldset>
      <fieldset className="grid gap-1">
        <label className="text-sm text-gray-600" htmlFor="photo">
          Photo
        </label>
        <input 
          type='file' 
          className="shadow-none box-border w-full" 
          id="photo" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData(v => ({...v, photo: (e.target.files) ? e.target.files[0] : null}));
          }}
        />
      </fieldset>
    </div>
    <fieldset className="flex">
      <button 
        className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-cyan-700 bg-cyan-100"
        onClick={() => addPostHandler(data, (status) => {
          if (!status) setOpen(true)
        })}
      >
        Save Post
      </button>
    </fieldset>
  </div>
}