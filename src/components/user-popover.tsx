import { NavLink } from "react-router-dom";
import * as Popover from '@radix-ui/react-popover';
import { PersonIcon } from "@radix-ui/react-icons";
import './user-popover.css';

import Avatar from './avatar';
import LogoutDialog from "./logout-dialog";
import type { user } from "../@types/user";

export default function ({ user, logoutHandler }: { user?: user, logoutHandler: () => void }) {
    return <Popover.Root>
    <Popover.Trigger asChild>
      <button className='user_avatar' aria-label="User profile">
        <Avatar />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        <div className='flex flex-col gap-4'>
          <div>
            <p className="text-xl font-black text-slate-800 capitalize">
              #{user?.username}
            </p>
            <p className="text-xs text-slate-600">
              {user?.name}
            </p>
            <p className="text-xs text-slate-600">
              {user?.email}
            </p>
          </div>

          <div className='flex justify-between'>

            <NavLink to={`/user`}>
              <button className='flex items-center gap-x-2 text-sm'>
                <PersonIcon />
                Edit
              </button>
            </NavLink>

            <LogoutDialog logoutHandler={logoutHandler} />

          </div>
        </div>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
};
