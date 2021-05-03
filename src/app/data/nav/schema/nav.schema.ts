export interface IUserImage{
    profilePicture: string
}
export interface INotification{
    username: string,
    postId: number
    notificationType: NotificationType
}

export enum NotificationType{
    Post,
    Comment,
    Message
}

export enum MenuType{
    Settings,
    Messages,
    Notifications
   }