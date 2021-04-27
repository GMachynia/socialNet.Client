export interface INewPost{
    postContent: string;
    postImage?: string;
}

export interface IPost{
    username: string,
    profilePicture: string,
    postId: number,
    postContent: string,
    postImage?: string,
    postDateTime?: Date,
    comments?: IComment[]
}

export interface IComment{
    content: string,
    commentOwner: string,
    commentDateTime: string
}
