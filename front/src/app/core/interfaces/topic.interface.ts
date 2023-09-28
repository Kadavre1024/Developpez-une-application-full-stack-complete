/**
 * Topic interface class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export interface Topic {
    id?: number;
    name: string;
    description: string;
    users: number[];
}