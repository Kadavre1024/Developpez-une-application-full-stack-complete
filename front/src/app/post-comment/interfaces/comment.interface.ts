/**
 * Comment interface class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export interface Comment{
    id: number;
    text:string;
    user_id: number;
    post_id: number;
    createdAt: Date;
}