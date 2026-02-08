export interface Post {
  id: string;
  content: string;
  userId: string;
  username: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface PostCardProps {
  post: Post;
  onCommentPress?: (postId: string, post?: Post) => void;
}
