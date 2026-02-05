import { Input, Label } from '@shared/components';
import { FieldApi } from '@tanstack/react-form';

interface FormFieldProps {
    field: FieldApi<any, any, any, any>;
	label: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'date';
}

export const FormField = (props: FormFieldProps) => {
    const { field, label, type = 'text', placeholder } = props;

	return (
		<div className="mb-4">
			<Label htmlFor={field.name as string}>{label}</Label>

			<Input
				type={type}
				id={field.name as string}
				value={field.state.value}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				name={field.name as string}
				error={field.state.meta.errors.length > 0}
				onChange={(e) => field.handleChange(e.target.value)}
			/>

			{field.state.meta.errors.length > 0 && (
				<div className="text-red-600 text-sm mt-1">
					{field.state.meta.errors[0]}
				</div>
			)}
		</div>
	);
};
