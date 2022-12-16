import { redirect, useLoaderData } from 'react-router-dom';
import authService from './services/auth.service';

export async function loader() {
    try {
        return await authService.getData();
    }
    catch (e) {
        if (e.message === "Unauthorized")
            return redirect("/login");
        throw e;
    }
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