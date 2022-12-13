import { redirect, useLoaderData } from 'react-router-dom';
import authService from './authService';

export async function loader() {
    if (authService.isAuthenticated() === false) {
        return redirect("/login");
    }
    return await authService.getData();
}

export default function Dashboard() {
    let { data } = useLoaderData();

    return (
        <div>
            <h1>Secret page</h1>
            <p>Secret data: {data}</p>
        </div>
    );
}