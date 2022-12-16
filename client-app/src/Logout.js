import authService from "./services/auth.service";
import { redirect } from "react-router-dom";

export async function loader() {
    if (authService.isAuthenticated) {
        await authService.logout();
    }
    return redirect("/");
}

export default function Logout() {
    return (<></>);    
}