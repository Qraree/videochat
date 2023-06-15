import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login/Login";
import Room from "./pages/Room/Room";

export const router = createBrowserRouter([
    {path: "/login", element: Login()},
    {path: "/room", element: Room()},
    {path: "*", element: Login()},
])
