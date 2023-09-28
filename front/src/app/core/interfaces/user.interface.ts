/**
 * User interface class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export interface User {
	id: number,
	userName: string,
	email: string,
	password: string,
	created_at: Date,
	updated_at: Date
}