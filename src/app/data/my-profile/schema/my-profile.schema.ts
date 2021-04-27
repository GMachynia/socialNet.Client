import { IUserProfile } from "../../profile/schema/profile.schema";

export interface IMyProfile extends IUserProfile{
 invitations: IInvitation[];
}

export interface IInvitation {
    username: string,
    firstName: string,
    lastName: string
}

export interface IUpdateFriendshipStatus{
    friendUsername: string,
    status: FriendshipStatus
}

export enum FriendshipStatus{
 None = 0,
 Approved = 1,
 Rejected = 2,
 Blocked = 3
}