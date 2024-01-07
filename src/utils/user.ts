import localforage from "localforage";
import type { user } from "../@types/user";
import type { login } from "../@types/login";
import type { changePass } from "../@types/change-pass";

const api_host = import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/";

export async function registerUser(data: user) {
  
  const res = await fetch(`${api_host}users/`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok){
    const json = await res.json();
    throw new Error(json.message[0])
  }
  
}

export async function loginUser(data: login) {

  const res = await fetch(`${api_host}auth/login`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (!res.ok){  
    throw new Error(json.message[0])
  }

  setLocal("user", json.user);
  setLocal("token", json.token);

  return
}

export async function logoutUser() {

  const token: string | null = await localforage.getItem("token");
  if (!token)
    throw new Error('failed convert token')

  const res = await fetch(`${api_host}auth/logout`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: token
    })
  });

  if (!res.ok){  
    const json = await res.json();
    throw new Error(json.message[0])
  }

  removeLocal("user");
  removeLocal("token");

  return
}

export async function updateUser(data: user) {

  const userid = await convTokenUserid();

  const res = await fetch(`${api_host}users/${userid}`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (!res.ok){  
    throw new Error(json.message[0])
  }

  setLocal("user", data);

  return
}

export async function changeUserPass(data: changePass) {
  const userid = await convTokenUserid();

  const res = await fetch(`${api_host}users/${userid}/change-password`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  if (!res.ok){  
    throw new Error(json.message[0])
  }

  return 
}

function setLocal(key: string, value: any) {
  return localforage.setItem(key, value);
}

function removeLocal(key: string) {
  return localforage.removeItem(key);
}

export async function getUser() {
  return await localforage.getItem("user");
}

export async function getToken() {
  return await localforage.getItem("token");
}

export async function convTokenUserid() {
  const token: string | null = await localforage.getItem("token");
  if (!token) return 0;
    // throw new Error('failed convert token')

  const randomLen = Number(token.charAt(0));
  const tokenStrLen = token?.length;
  return token.substring(randomLen + 1, tokenStrLen - randomLen) 
}