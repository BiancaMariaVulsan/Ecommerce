export class LoginUserRequest {
    constructor() { }

    public email: string;
    public password: string;
}

export class SignupUserRequest {
    constructor() { }

    public email: string;
    public password: string;
    public role: number;
}

export class LoginUserReply {
    constructor() { }

    public id: number;
    public email: string;
    public token: string;
    public role: UserRole;
}

export class UserRole {
    constructor() { }

    public id: string;
    public name: string;
}