export interface User {
  id: string;
  username: string;
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  joinedAt?: string;
  lastOnline?: string;
  profileImg?: string;
  coverImg?: string;
  posts?: Array<Post>;
  likes?: Array<Post>;
  comments?: Array<Comment>;
  friends?: Array<User>;
  requests?: Array<Request>;
  outgoingRequests?: Array<Request>;
  joinedFormatted?: string;
  _count?: {
    posts: number;
    friends: number;
  };
}

export interface Post {
  id: string;
  post?: string;
  postImg?: string;
  author?: User;
  authorId: string;
  likedBy?: Array<User>;
  createdAt: string;
  createdFormatted: string;
  comments: Array<any>;
}

export interface Comment {
  id: string;
  comment?: string;
  commentImg?: string;
  author: User;
  authorId: string;
  post: Post;
  postId: string;
  createdAt: string;
  createdFormatted: string;
}

export interface Request {
  id: string;
  to: User;
  toUserId: string;
  from: User;
  fromUserId: string;
  sentAt: string;
  sentFormatted: string;
}

export interface Page {
  success?: boolean;
  posts: Post[];
  nextPage: string | null;
}
