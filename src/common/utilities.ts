export function camelToNormal(camelCase: string): string {
	const spaced = camelCase.replace(/([A-Z])/g, ' $1');
	return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
