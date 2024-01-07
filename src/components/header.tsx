import { RowsIcon } from "@radix-ui/react-icons";
import UserPopOver from "../components/user-popover"
import type { user } from "../@types/user";
import "./header.css"

type headerProps = {
  user?: user,
  fullContent: boolean,
  togleSidebar: () => void,
  logoutHandler: () => void
}

export default function ({ user, fullContent, togleSidebar, logoutHandler }: headerProps) {
  return <div 
    id="header"
    className={`flex p-4 items-center ${ !fullContent ? "justify-between" : "justify-end"}`}
  >
    { !fullContent && 
      <button 
        className="cursor-pointer"
        onClick={togleSidebar}
      >
        <RowsIcon />
      </button> 
    }
    <UserPopOver user={user} logoutHandler={logoutHandler} />
  </div>
}