export class LoginUserRequest {
    constructor() { }

    public email: string;
    public password: string;
}

export class SignupUserRequest {
    constructor() { }

    public email: string;
    public password: string;
    public role: string;
}

export class LoginUserReply {
    public id: string;
    public email: string;
    public token: string;
    public role: UserRole;

    constructor() {
        this.role = new UserRole()
        this.role.id = "32a8f7db-9e02-4ea1-8c70-305f5a9f6252"
        this.role.name = "Customer"
    }
}

export class UserRole {
    constructor() { }

    public id: string;
    public name: string;
}