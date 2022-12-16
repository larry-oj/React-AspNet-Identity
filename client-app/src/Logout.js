import authService from "./services/auth.service";
import { redirect } from "react-router-dom";

export async function loader() {
    try {
        await authService.logout();   
    }
    catch (error) {
        alert(error.message);
    }
    return redirect("/");
}

export default function Logout() {
    return (<></>);    
}