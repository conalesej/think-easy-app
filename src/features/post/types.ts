export interface Author {
  [key: string]: any;
}
export interface PostInput {
  title: string;
  content: string;
  published: boolean;
  author: Author;
}

export interface Post {
  id?: string;
  title: string;
  content: string;
  published: boolean;

  createdAt: string; // should be converted to date time
  updatedAt: string; // should be converted to date time

  authorId: string;
}

export interface PostResponse extends Post {}
