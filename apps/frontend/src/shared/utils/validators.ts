export const validators = {
	required: (fieldName: string = 'Este campo') => {
		return ({ value }: { value: any }) => {
			if (!value || (typeof value === 'string' && value.trim() === '')) {
				return `${fieldName} es requerido`;
			}
			return undefined;
		};
	},

	email: () => {
		return ({ value }: { value: string }) => {
			if (!value) return 'El email es requerido';
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				return 'Email inválido';
			}
			return undefined;
		};
	},

	minLength: (min: number, fieldName: string = 'Este campo') => {
		return ({ value }: { value: string }) => {
			if (!value) return `${fieldName} es requerido`;
			if (value.length < min) {
				return `${fieldName} debe tener al menos ${min} caracteres`;
			}
			return undefined;
		};
	},

	maxLength: (max: number, fieldName: string = 'Este campo') => {
		return ({ value }: { value: string }) => {
			if (value && value.length > max) {
				return `${fieldName} no debe exceder ${max} caracteres`;
			}
			return undefined;
		};
	},

	number: (fieldName: string = 'Este campo') => {
		return ({ value }: { value: any }) => {
			if (value && isNaN(Number(value))) {
				return `${fieldName} debe ser un número válido`;
			}
			return undefined;
		};
	},

	min: (minValue: number, fieldName: string = 'Este campo') => {
		return ({ value }: { value: number }) => {
			if (value < minValue) {
				return `${fieldName} debe ser mayor o igual a ${minValue}`;
			}
			return undefined;
		};
	},

	max: (maxValue: number, fieldName: string = 'Este campo') => {
		return ({ value }: { value: number }) => {
			if (value > maxValue) {
				return `${fieldName} debe ser menor o igual a ${maxValue}`;
			}
			return undefined;
		};
	},

	pattern: (regex: RegExp, message: string) => {
		return ({ value }: { value: string }) => {
			if (value && !regex.test(value)) {
				return message;
			}
			return undefined;
		};
	},
};
