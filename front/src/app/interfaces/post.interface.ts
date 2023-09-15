export interface Post{
    id: number;
    title: string;
    text: string;
    topic_id: number;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
}