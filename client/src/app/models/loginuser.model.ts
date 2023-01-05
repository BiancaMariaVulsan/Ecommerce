export class LoginUserRequest {
    constructor() { }

    public userName: string;
    public password: string;
}

export class SignupUserRequest {
    constructor() { }

    public email: string;
    public username: string;
    public password: string;
    public roleId: string;
    public firstName: string;
    public lastName: string;
}

export class LoginUserReply {
    public id: string;
    public email: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public token: string;
    public role: UserRole = new UserRole();

    constructor() { }
}

export class UserRole {
    constructor() { }

    public id: string;
    public name: string;
}