import { useState } from "react"
import { useLoaderData } from "react-router-dom";

import Toast from "../../components/toast"
import { getOneUserPost, updateUserPost } from "../../utils/post"
import type { post } from "../../@types/post";
import type { updatePost } from "../../@types/update-post";

export async function loader({ params }: { params: any }) {

  const postid = params.id;
  const post: post = await getOneUserPost(postid);

  return { postid, post }
}

type handlerProps = updatePost;

const editHandler = async (
  id: number,
  data: handlerProps, 
  callback: (status: boolean) => void
) => {
  try {

    await updateUserPost(id, data);
    callback(true)

  } catch (e) {
    if (e instanceof Error)
      console.error(e.message)

    return callback(false)
  }
}

type loader = {
  postid: number,
  post: updatePost
}

export default function () {
  const { postid, post } = useLoaderData() as loader;

  const [openSuc, setOpenSuc] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  return <div className="space-y-6">
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
      description="Update user post success."
    />
    <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
      <div>
        <h1 className="text-2xl font-black">
          Edit Post.
        </h1>
        <p className="text-slate-500">
          Update and share again your post to your connected friend.
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
          defaultValue={post.name}
          onChange={(e) => post.name = e.target.value}
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
          defaultValue={post.caption}
          onChange={(e) => post.caption = e.target.value}
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
          defaultValue={post.tags}
          onChange={(e) => post.tags = e.target.value}
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
            post.photo = (e.target.files) ? e.target.files[0] : null
          }}
        />
      </fieldset>
    </div>
    <fieldset className="flex">
      <button 
        className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-cyan-700 bg-cyan-100"
        onClick={() => editHandler(postid, post, (status) => {
          setOpenSuc(status)
          setOpenErr(!status)
        })}
      >
        Save Post
      </button>
    </fieldset>
  </div>
}