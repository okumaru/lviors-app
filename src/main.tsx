import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import RootLayout, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import LoginPage,{
  loader as loginLoader,
} from "./pages/login";
import RegisterPage, {
  loader as registerLoader,
} from "./pages/register";
import EditUserPage, {
  loader as editUserLoader,
} from "./pages/user/edit";
import AllPostsPage from "./pages/post/all";
import UserPostsPage from "./pages/post/user-posts";
import AddPostPage from "./pages/post/add";
import EditPostPage, { 
  loader as editPostLoader 
} from "./pages/post/edit";

import ContactRoute, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditRoute, {
  action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import ErrorPage from './error-page';
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [

      // Login path
      {
        path: "login",
        element: <LoginPage />,
        loader: loginLoader,
      },

      // Register path
      {
        path: "register",
        element: <RegisterPage />,
        loader: registerLoader,
      },
      
      // Authenticated path
      {
        path: "/",
        element: <RootLayout />,
        loader: rootLoader,
        action: rootAction,
        children: [

          // Post path
          { 
            index: true, 
            element: <AllPostsPage /> 
          },

          // Posts path
          {
            path: "posts",
            element: <UserPostsPage />,
          },

          // Add post path
          {
            path: "posts/add",
            element: <AddPostPage />
          },

          // Edit post path
          {
            path: "posts/:id",
            element: <EditPostPage />,
            loader: editPostLoader
          },

          // User path
          {
            path: "user",
            element: <EditUserPage />,
            loader: editUserLoader
          },

        ]
      }
    ]
  },

  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   errorElement: <ErrorPage />,
  //   loader: rootLoader,
  //   action: rootAction,
  //   children: [
  //     {
  //       errorElement: <ErrorPage />,
  //       children: [
  //         { index: true, element: <Index /> },
  //         {
  //           path: "contacts/:contactId",
  //           element: <ContactRoute />,
  //           loader: contactLoader,
  //           action: contactAction,
  //         },
  //         {
  //           path: "contacts/:contactId/edit",
  //           element: <EditRoute />,
  //           loader: contactLoader,
  //           action: editAction,
  //         },
  //         {
  //           path: "contacts/:contactId/destroy",
  //           action: destroyAction,
  //           errorElement: <div>Oops! There was an error.</div>,
  //         },
  //       ]
  //     }
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
