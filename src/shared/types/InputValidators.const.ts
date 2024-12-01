export const InputValidators = {
	text: (input: any) => input.length > 0,
	phone: (input: any) => /^9\d{2}(\s\d{3}){2}$/.test(input),
	email: (input: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
	number: (input: any) => /^[1-9]\d*(\.\d+)?$/.test(input),
	money: (input: any) => /^[1-9]\d*(\.\d{2})?$/.test(input),
	"datetime-local": (input: any) =>
		/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/.test(input),
	color: (input: any) => /^#[0-9a-fA-F]{6}$/.test(input),
	dni: (input: any) => /^\d{8}$/.test(input),
	pasaporte: (input: any) => /^[0-9]{7,11}$/.test(input),
	ce: (input: any) => /^\d{9}$/.test(input),
	password: (input: any) => input.length >= 8,
};

export const SanitizationRules: Record<string, (text: string) => string> = {
	text: (text) => text.replace(/[^a-zA-Z\s]/g, ""), // Permite solo letras y espacios
	number: (text) => text.replace(/[^0-9]/g, ""), // Permite solo números
	email: (text) => text.replace(/[^a-zA-Z0-9@.]/g, ""), // Permite email válido
	money: (text) => text.replace(/[^0-9.]/g, ""), // Permite números y punto
	dni: (text) => text.replace(/[^0-9]/g, "").slice(0, 8), // Permite solo números y hasta 8 dígitos
	pasaporte: (text) => text.replace(/[^a-zA-Z0-9]/g, "").slice(0, 11), // Permite solo letras y números
	ce: (text) => text.replace(/[^0-9]/g, "").slice(0, 9),
	password: (text) => text, // No modifica el texto
};

export const FormatRules: Record<string, (text: string) => string> = {
	text: (text) => text.trim(), // Devuelve texto sin modificar (limpia espacios extremos)
	number: (text) => text.replace(/[^0-9]/g, ""), // Solo números
	money: (text) => {
		if (!text.includes(".")) {
			return `${text}.00`;
		}
		const [integer, decimal] = text.split(".");
		return `${integer}.${`${decimal}0`.slice(0, 2)}`;
	},
	dni: (text) => text.slice(0, 8), // Asegura que no exceda 8 dígitos
	pasaporte: (text) => text.slice(0, 11), // Asegura que no exceda 9 dígitos
	ce: (text) => text.padStart(9, "0"),
	password: (text) => text, // No modifica el texto
};
