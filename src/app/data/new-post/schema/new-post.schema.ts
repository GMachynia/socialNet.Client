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
    comments?: IComment[]
}

export interface IComment{
    content: string,
    commentOwner: string,
    postId: number
}

export interface INewComment {
    content: string,
    postId: number
}
