import * as Dialog from '@radix-ui/react-dialog';
import { ExitIcon } from '@radix-ui/react-icons';
import './logout-dialog.css';

export default function ({ logoutHandler }: { logoutHandler: () => void }) {
  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className='flex items-center gap-x-2 text-sm cursor-pointer'>
        <ExitIcon />
        <span>Logout</span>
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <div className='mb-4'>
          <Dialog.Title className="DialogTitle">Confirmation</Dialog.Title>
          <Dialog.Description className="text-sm text-slate-500">
            Are you sure want to logout?
          </Dialog.Description>
        </div>

        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button 
              className="text-base font-medium px-4 py-2 rounded-md text-rose-700 bg-rose-100"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
};