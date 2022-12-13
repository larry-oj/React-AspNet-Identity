import Cookie from 'js-cookie'

class AuthService {
    constructor() {
        console.log("AuthService constructor");
        this.jwt_token = Cookie.get('jwt_token');
        this.authenticated = false;
    }

    async register(username, password) {
        this.jwt_token = "test";
        Cookie.set("jwt_token", "test");
        this.authenticated = true;
    }
    
    async login(username, password) {
        if (username !== "admin" && password !== "admin") 
            throw new Error("Invalid username or password");

        this.jwt_token = "test";
        this.authenticated = true;
        Cookie.set("jwt_token", "test");
    }
    
    async logout() {
        this.authenticated = false;
        Cookie.remove("jwt_token");
    }
    
    isAuthenticated() {
        return this.authenticated;
    }

    get jwtToken () {
        return this.jwt_token;
    }

    async getData() {
        if (!this.authenticated)
            throw new Error("Not authenticated");

        return { data: "secret data from api" };
    }
}

export default new AuthService();