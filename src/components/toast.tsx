// import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './toast.css';

type ToastProps = {
  open: boolean, 
  setOpen: (val: boolean) => void, 
  title: string,
  description: string,
}

export default function ({open, setOpen, title, description}: ToastProps) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          {title}
        </Toast.Title>
        <Toast.Description className='text-sm text-wrap'>
          {description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};
