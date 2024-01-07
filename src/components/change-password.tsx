import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, LockClosedIcon } from '@radix-ui/react-icons';
import type { changePass } from '../@types/change-pass';
import './change-password.css';

export default function ({ handler }: { handler: (data: changePass) => void }) {

  const [data, setData] = useState<changePass>({
    old_pass: "", 
    new_pass: "", 
    conf_pass: ""
  })

  return <Dialog.Root>
  <Dialog.Trigger asChild>
    <button className='flex items-center gap-x-2 text-sm cursor-pointer'>
      <LockClosedIcon />
      <span>Change password</span>
    </button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="DialogOverlay" />
    <Dialog.Content className="DialogContent">
      <div className='mb-4'>
        <Dialog.Title className="DialogTitle">Change Password</Dialog.Title>
        <Dialog.Description className="text-sm text-slate-500">
          Make sure your old password is correct and input new password twice for confirmation.
        </Dialog.Description>
      </div>
      
      <fieldset className="Fieldset">
        <label className="w-[75px] text-sm text-right text-gray-600" htmlFor="old_pass">
          Old Password
        </label>
        <input 
          type='password' 
          className="border rounded-md border-slate-700 box-border w-full" 
          id="old_pass" 
          onChange={(e) => setData(v => ({...v, old_pass: e.target.value}))}
        />
      </fieldset>
      <fieldset className="Fieldset">
        <label className="w-[75px] text-sm text-right text-gray-600" htmlFor="new_pass">
          New Password
        </label>
        <input 
          type='password' 
          className="border rounded-md border-slate-700 box-border w-full" 
          id="new_pass" 
          onChange={(e) => setData(v => ({...v, new_pass: e.target.value}))}
        />
      </fieldset>
      <fieldset className="Fieldset">
        <label className="w-[75px] text-sm text-right text-gray-600" htmlFor="conf_pass">
          Confirm Password
        </label>
        <input 
          type='password' 
          className="border rounded-md border-slate-700 box-border w-full" 
          id="conf_pass" 
          onChange={(e) => setData(v => ({...v, conf_pass: e.target.value}))}
        />
      </fieldset>
      <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
        <Dialog.Close asChild>
          <button 
            className="text-base font-medium px-4 py-2 rounded-md text-emerald-700 bg-emerald-100"
            onClick={() => handler(data)}
          >
            Save changes
          </button>
        </Dialog.Close>
      </div>
      <Dialog.Close asChild>
        <button className="IconButton" aria-label="Close">
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
};