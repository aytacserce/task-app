import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Notes from "./Notes";
import Position from "./Position";
import Admin from "./Admin";
import AdminNotes from "./AdminNotes";
import AdminAddNote from "./AdminAddNote";
import About from "./About";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/notes", element: <Notes /> },
  { path: "/position", element: <Position /> },
  { path: "/admin", element: <Admin /> },
  { path: "/adminnotes", element: <AdminNotes /> },
  { path: "/adminaddnote", element: <AdminAddNote /> },
  { path: "/about", element: <About /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
