import { NavLink } from "react-router-dom";
import { RocketIcon, HomeIcon } from "@radix-ui/react-icons";

import { contact } from "../@types/contact";
import { getContacts } from "../utils/contacts";
import "./sidebar.css"

export async function loader({ request }: { request: any }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

type loader = {
  contacts: contact[],
  q: string | undefined
}

type NavItemProps = {
  to: string,
  children: string | JSX.Element | JSX.Element[]
}

const NavItem = ({ to, children }: NavItemProps) => {
  return <li>
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isActive
          ? "active h-[36px]"
          : isPending
            ? "pending h-[36px]"
            : "h-[36px]"
      }
    >
      {children}
    </NavLink>
  </li>
}

export default function ({ sidebarCol }: { sidebarCol: boolean }) {
  return <div className={`relative ${sidebarCol ? 'w-[81px]' : 'w-72'}`}>
    <div 
    id="sidebar"
    className={`fixed h-screen flex flex-col border-r border-[#e3e3e3] ${sidebarCol ? 'w-fit' : 'w-72'}`}
  >
    <h1 className="p-4">
      <span className={`${sidebarCol ? 'hidden' : 'block'}`}>
        React L`viors App
      </span>
    </h1>
    <nav className="p-4">
      <ul>
        <NavItem to={`/`}>
          <>
            <HomeIcon />
            <span className={`text-sm ${sidebarCol ? 'hidden' : 'block'}`}>
              Dashboard
            </span>
          </>
        </NavItem>
        <NavItem to={`/posts`}>
          <>
            <RocketIcon />
            <span className={`text-sm ${sidebarCol ? 'hidden' : 'block'}`}>
              Post
            </span>
          </>
        </NavItem>
      </ul>
    </nav>
  </div>
  </div>
}