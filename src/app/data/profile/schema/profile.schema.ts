import { StringMap } from "@angular/compiler/src/compiler_facade_interface"
import { Byte } from "@angular/compiler/src/util"

export interface IUserProfile{
    username: string,
    firstName: string,
    lastName: string,
    city: string,
    dateOfBirth: Date,
    profilePicture: Byte[]
}

export interface IFriendship{
    username: string,
    friendUsername: string;
}