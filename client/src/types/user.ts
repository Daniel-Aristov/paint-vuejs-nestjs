export default interface User {
	id: number,
	email: string,
	name: string,
	surname: string,
	password: string,
	age: number | null,
	createAt: string
}
