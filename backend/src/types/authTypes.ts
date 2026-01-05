import type { JwtPayload } from "jsonwebtoken";

export type signUpCredentials = {
    username: string,
    email: string,
    password: string
}

export type loginCredentials = {
    identifier: string,
    password: string
}

export type AuthPayload = JwtPayload & {
    sub: number;
};