import type { post } from "./post"

export type fetchPost = {
  curr_page: number,
  total_page: number,
  data: post[]
}