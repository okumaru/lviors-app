import { useState, useEffect } from "react"
import { MagnifyingGlassIcon, CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons"
import SelectSearchPost from "../../components/select-search-post"
import CardPost from "../../components/card-post"
import { getPosts, likePost, dislikePost } from "../../utils/post"
import type { post } from "../../@types/post"
import type { fetchPost } from "../../@types/fetch-post"
import type { searchCond } from "../../@types/search-conditions"

export default function () {

  const [totPage, SetTotPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [posts, setPosts] = useState<post[] | null>();
  const [acSearch, setAcSearch] = useState<string>('name');
  const [keyword, setKeyword] = useState<string>();
  const [conds, setConds] = useState<searchCond>({
    name: undefined,
    caption: undefined,
    tags: undefined,
  })

  useEffect(() => {
    getPosts(page, limit, conds)
      .then((data: fetchPost) => {
        setPage(data.curr_page)
        SetTotPage(data.total_page)
        setPosts(data.data)
      })
  }, []);

  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black">
        Recent Posts Published.
      </h1>
      <p className="text-slate-500">
        You can like/dislike a post from your friend connection.
      </p>
    </div>
    <div className="flex flex-col md:flex-row items-start gap-4 justify-between ">
      {/* Search content */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            type='text'
            className="border rounded-md border-slate-700 box-border w-full"
            id="search"
            defaultValue={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button 
            className="cursor-pointer text-base font-medium px-4 py-2 rounded-md text-slate-700 bg-slate-100"
            onClick={() => {
              const searchConds = {
                name: acSearch === "name" ? keyword : undefined,
                caption: acSearch === "caption" ? keyword : undefined,
                tags: acSearch === "tags" ? keyword : undefined,
              }
              setConds(searchConds);
              getPosts( 1, limit, searchConds)
                .then((data: fetchPost) => {
                  setPage(data.curr_page)
                  SetTotPage(data.total_page)
                  setPosts(data.data)
                })
            }}
          >
            <MagnifyingGlassIcon />
          </button>
        </div>
        <SelectSearchPost onChange={setAcSearch} />
      </div>

      {/* Pagination content */}
      <div className="grid gap-y-2">
        <div className="flex space-x-2">
          <button 
            className="cursor-pointer text-base font-medium px-4 py-3 rounded-md text-slate-700 bg-slate-100"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1)
                getPosts(page - 1, limit, conds)
                  .then((data: fetchPost) => {
                    setPage(data.curr_page)
                    SetTotPage(data.total_page)
                    setPosts(data.data)
                  })
              }
            }}
          >
            <CaretLeftIcon />
          </button>
          <button 
            className="cursor-pointer text-base font-medium px-4 py-3 rounded-md text-slate-700 bg-slate-100"
            onClick={() => {
              if (totPage > page) {
                setPage(page + 1)
                getPosts(page + 1, limit, conds)
                  .then((data: fetchPost) => {
                    setPage(data.curr_page)
                    SetTotPage(data.total_page)
                    setPosts(data.data)
                  })
              }
            }}
          >
            <CaretRightIcon />
          </button>
        </div>
        <p className="text-center">Page {page} of {totPage}</p>
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-2">
      {posts &&
        posts.map((post, i: number) => <CardPost
          key={i}
          post={post}
          likeHandler={() => likePost(post.id)}
          dislikeHandler={() => dislikePost(post.id)}
        />)
      }
    </div>
  </div>
}