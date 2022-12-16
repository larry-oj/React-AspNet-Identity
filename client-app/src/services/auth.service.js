class AuthService {
    constructor() {
        this.apiUrl = "https://localhost:7283";
    }

    async register(username, email, password) {
        const requestBody = {
            username,
            password,
            email
        }

        const response = await fetch(`${this.apiUrl}/Auth/Register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 201) {
            let error = await response.text();
            throw new Error(error);
        }
    }
    
    async login(username, password) {
        const requestBody = {
            username,
            password
        }

        const response = await fetch(`${this.apiUrl}/Auth/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: "include"
        });

        if (response.status !== 200) {
            let error = await response.text();
            throw new Error(error);
        }
    }
    
    async logout() {
        const response = await fetch(`${this.apiUrl}/Auth/Logout`, {
            method: "POST",
            credentials: "include"
        });

        if (response.status !== 200) {
            let error = await response.text();
            throw new Error(error);
        }
    }

    async getData() {
        // send a cross origin cookie request to the server using fetch
        const response = await fetch(`${this.apiUrl}/Auth`, {
            method: "GET",
            origin: "http://localhost:3000",
            credentials: "include"
        });


        if (response.status !== 200) {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            
            let error = await response.text();
            throw new Error(error);
        }

        return await response.json();
    }
}

export default new AuthService();