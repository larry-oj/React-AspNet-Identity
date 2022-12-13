import authService from "./authService";
import { redirect } from "react-router-dom";

export async function loader() {
    await authService.logout();
    return redirect("/");
}

export default function Logout() {
    return (<></>);    
}