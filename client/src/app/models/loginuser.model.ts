export class LoginUserRequest {
    constructor() { }

    public email: string;
    public password: string;
}

export class SignupUserRequest {
    constructor() { }

    public email: string;
    public password: string;
    public roleId: string;
}

export class LoginUserReply {
    public id: string;
    public email: string;
    public token: string;
    public role: UserRole = new UserRole();

    constructor() { }
}

export class UserRole {
    constructor() { }

    public id: string;
    public name: string;
}