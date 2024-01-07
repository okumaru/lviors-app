import type { addPost } from "../@types/add-post"
import type { updatePost } from "../@types/update-post";
import type { searchCond } from "../@types/search-conditions";
import { convTokenUserid } from "./user";

const api_host = import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/";
const userid = await convTokenUserid();

export async function addUserPost(data: addPost) {
  
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("caption", data.caption);
  formData.append("tags", data.tags);
  formData.append("photo", data.photo);

  const res = await fetch(`${api_host}users/${userid}/posts`,{
    method: 'PUT',
    body: formData,
  });

  if (!res.ok){
    const json = await res.json();
    throw new Error(json.message[0])
  }

  return
  
}

export async function updateUserPost(id: number,data: updatePost) {
  
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("caption", data.caption);
  formData.append("tags", data.tags);

  if (data.photo)
    formData.append("photo", data.photo);

  const res = await fetch(`${api_host}users/${userid}/posts/${id}`,{
    method: 'POST',
    body: formData,
  });

  if (!res.ok){
    const json = await res.json();
    throw new Error(json.message[0])
  }

  return
  
}

export async function getOneUserPost(id: number) {
  
  const res = await fetch(`${api_host}users/${userid}/posts/${id}`,{
    method: 'GET',
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({})
  });

  const json = await res.json();
  
  if (!res.ok){
    throw new Error(json.message[0])
  }

  return json

}

export async function getUserPosts(
  page: number, 
  limit: number,
  conditions?: searchCond
) {

  let url = `${api_host}users/${userid}/posts?page=${page}&limit=${limit}`;

  if (conditions?.name)
    url += `&name=${conditions?.name}`

  if (conditions?.caption)
    url += `&caption=${conditions?.caption}`

  if (conditions?.tags)
    url += `&tags=${conditions.tags}`

  const res = await fetch(url,{
    method: 'GET',
  });

  const json = await res.json();

  if (!res.ok){
    throw new Error(json.message[0])
  }

  return json;

}

export async function getOnePost(id: number) {

  const res = await fetch(`${api_host}posts/${id}`,{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  const json = await res.json();

  if (!res.ok){
    throw new Error(json.message[0])
  }

  return json;

}

export async function getPosts(
  page: number, 
  limit: number,
  conditions?: searchCond
) {

  let url = `${api_host}posts?page=${page}&limit=${limit}`;

  if (conditions?.name)
    url += `&name=${conditions?.name}`

  if (conditions?.caption)
    url += `&caption=${conditions?.caption}`

  if (conditions?.tags)
    url += `&tags=${conditions.tags}`

  const res = await fetch(url,{
    method: 'GET',
  });

  const json = await res.json();

  if (!res.ok){
    throw new Error(json.message[0])
  }

  return json

}

export async function deletePost(id: number) {

  const res = await fetch(`${api_host}posts/${id}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  if (!res.ok){
    const json = await res.json();
    throw new Error(json.message[0])
  }

  return

}

export async function likePost(id: number) {

  const res = await fetch(`${api_host}posts/${id}/like`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  if (!res.ok){
    const json = await res.json();
    throw new Error(json.message[0])
  }

  return

}

export async function dislikePost(id: number) {

  const res = await fetch(`${api_host}posts/${id}/dislike`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  if (!res.ok){
    const json = await res.json();
    throw new Error(json.message[0])
  }

  return

}