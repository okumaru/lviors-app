import { useState, useEffect } from "react";
import { Outlet, redirect, useNavigation, useLoaderData } from "react-router-dom";

import { createContact } from "../utils/contacts";
import { getUser, getToken, logoutUser } from "../utils/user";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import type { user } from "../@types/user";

export async function loader() {

  const user = await getUser();
  const token = await getToken();

  if (!user || !token)
    return redirect(`/login`)

  return { user };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

const logoutHandler = async () => {
  try {

    await logoutUser();
    return window.location.href = "/login"

  } catch (e) {
    if (e instanceof Error)
      console.error(e.message)

    return
  }
}

type loader = {
  user: user
}

export default function () {
  const { user } = useLoaderData() as loader;
  const navigation = useNavigation();

  const [sidebarCol, setSidebarCol] = useState(false);
  const [fullContent, setFullContent] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarCol(true);
      setFullContent(true);
    }
  }, []);

  return (
    <>
      <Sidebar sidebarCol={sidebarCol}/>
      <div 
        id="content"
        className="flex-1"
      >
        <Header 
          user={user}
          fullContent={fullContent}
          togleSidebar={() => setSidebarCol(!sidebarCol)}
          logoutHandler={() => logoutHandler()}
        />
        <div
          id="detail"
          className={`text-sm p-4 md:p-8 lg:p-x-16 ${navigation.state === "loading" ? "loading" : ""}`}
        >
          <Outlet />
        </div>
      </div>

    </>
  );
}