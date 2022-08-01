import { hash } from 'bcryptjs';

export default class User {
    private readonly _name: string;
    private readonly _email: string;
    private _password: string;

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    constructor(name: string, email: string) {
        this._name = name;
        this._email = email;
    }

    public async setPassword(password: string, salt: string): Promise<void> {
        this._password = await hash(password, salt);
    }
}
