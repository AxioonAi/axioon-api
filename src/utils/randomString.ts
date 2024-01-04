export const lettersAndNumbers =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length: number) => {
	let code = "";

	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * lettersAndNumbers.length);
		code += lettersAndNumbers.charAt(random);
	}

	return code;
};
