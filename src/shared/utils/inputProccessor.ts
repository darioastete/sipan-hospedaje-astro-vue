import { FormatRules, SanitizationRules } from "@type/InputValidators.const";

export const satinizeText = (type: any, text: any) => {
	const textString = text.toString();
	const rule = SanitizationRules[type];
	if (!rule) {
		console.warn(`No sanitization rule found for type: ${type}`);

		return text; // Devuelve el texto sin modificar si no hay regla
	}

	return rule(textString);
};
export const formatText = (type: any, text: string) => {
	const rule = FormatRules[type];
	const textString = text.toString();
	if (!rule) {
		console.warn(`No format rule found for type: ${type}`);

		return text; // Devuelve el texto sin modificar si no hay regla
	}

	return rule(textString);
};
