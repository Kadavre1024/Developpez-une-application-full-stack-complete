/**
 * AuthSucess interface class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export interface AuthSuccess {
    token: string;
    type: string;
    id: number;
    username: string;
    name: string;
    password: string;
}