import { useState } from "react";
import type { post } from "../@types/post"
import "./card-post.css"

const api_host = import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/";

type cardProps = {
  post: post,
  editHandler?: () => void,
  likeHandler?: () => void,
  dislikeHandler?: () => void
}

export default function ({
  post,
  editHandler,
  likeHandler,
  dislikeHandler
}: cardProps) {

  const [likeCount, changeLikeCount] = useState<number>(post.likes || 0);

  return <div className="border border-slate-200 rounded-lg overflow-hidden">
    <div className="flex justify-center h-56">
      <img
        className="max-w-full max-h-56"
        src={`${api_host + post.photo?.replace("tmp/uploads/", "")}`}
      />
    </div>
    <div className="space-y-2 p-4 bg-neutral-100">
      <h4 className="text-2xl font-bold">{post.name}</h4>
      <p>{post.caption}</p>
      <p>
        {post.tags &&
          post.tags
            .split(',')
            .map((tag: string, i: number) =>
              <span
                key={i}
                className="rounded-md bg-slate-400 px-2 py-1"
              >
                {tag}
              </span>
            )
        }
      </p>
      <div className="flex justify-between items-center">
        {(editHandler || likeHandler || dislikeHandler) && 
          <div className="flex space-x-2">
            {editHandler && 
              <button 
                className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-slate-700 bg-slate-100"
                onClick={editHandler}
              >
                Edit
              </button>
            }
            {likeHandler && 
              <button 
                className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-cyan-700 bg-cyan-100"
                onClick={() => {
                  changeLikeCount(likeCount+1)
                  likeHandler()
                }}
              >
                Like
              </button>
            }
            {dislikeHandler && 
              <button 
                className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-rose-700 bg-rose-100"
                onClick={() => {
                  changeLikeCount(likeCount-1)
                  dislikeHandler()
                }}
              >
                Dislike
              </button>
            }
          </div>
        }
        <div>
          {likeCount} Likes
        </div>
      </div>
    </div>
  </div>
}