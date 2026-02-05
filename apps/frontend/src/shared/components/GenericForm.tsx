import { useForm } from '@tanstack/react-form';
import { Card, FormSubmitButton, FormFeedback } from '@shared/components';

interface FieldConfig {
	name: string;
	label: string;
	placeholder?: string;
	fieldType?: 'input' | 'textarea' | 'select';
	type?: 'text' | 'email' | 'password' | 'number' | 'date';
	options?: { label: string; value: string | number }[]; // Para select
	rows?: number;
	validators?: {
		onChange?: (props: { value: unknown }) => string | undefined;
		onBlur?: (props: { value: unknown }) => string | undefined;
	};
}

interface GenericFormProps<T extends Record<string, unknown>> {
	title?: string;
	defaultValues: T;
	isError?: boolean;
	isLoading?: boolean;
	isSuccess?: boolean;
	submitText?: string;
	loadingText?: string;
	fields: FieldConfig[];
	errorMessage?: string;
	successMessage?: string;
	onSubmit: (value: T) => void | Promise<void>;
}

export const GenericForm = <T extends Record<string, unknown>>(props: GenericFormProps<T>) => {
	const {
		title,
		fields,
		onSubmit,
		defaultValues,
		isError = false,
		isLoading = false,
		isSuccess = false,
		submitText = 'Enviar',
		loadingText = 'Enviando...',
		errorMessage = 'Ocurrió un error.',
		successMessage = 'Operación exitosa.',
	} = props;

	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			await onSubmit(value as T);
		},
	});

	return (
		<Card>
			{title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				{fields.map((fieldConfig) => (
					<form.Field
						key={fieldConfig.name}
						name={fieldConfig.name}
						validators={fieldConfig.validators}
					>
						{(field) => {
							const baseClass = "w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800";
							
							return (
								<div className="mb-4">
									<label
										htmlFor={fieldConfig.name}
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
									>
										{fieldConfig.label}
									</label>

									{(!fieldConfig.fieldType || fieldConfig.fieldType === 'input') && (
										<input
											id={fieldConfig.name}
											name={fieldConfig.name}
											onBlur={field.handleBlur}
											className={`h-11 ${baseClass}`}
											type={fieldConfig.type || 'text'}
											value={field.state.value as string}
											placeholder={fieldConfig.placeholder}
											onChange={(e) => field.handleChange(e.target.value as never)}
										/>
									)}

									{fieldConfig.fieldType === 'textarea' && (
										<textarea
											id={fieldConfig.name}
											className={baseClass}
											name={fieldConfig.name}
											onBlur={field.handleBlur}
											rows={fieldConfig.rows || 4}
											value={field.state.value as string}
											placeholder={fieldConfig.placeholder}
											onChange={(e) => field.handleChange(e.target.value as never)}
										/>
									)}

									{fieldConfig.fieldType === 'select' && (
										<select
											id={fieldConfig.name}
											name={fieldConfig.name}
											onBlur={field.handleBlur}
											className={`h-11 ${baseClass}`}
											value={field.state.value as string}
											onChange={(e) => field.handleChange(e.target.value as never)}
										>
											<option value="">Seleccione una opción</option>
											{fieldConfig.options?.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									)}

									{field.state.meta.errors.length > 0 && (
										<div className="text-red-600 text-sm mt-1">
											{field.state.meta.errors[0]}
										</div>
									)}
								</div>
							);
						}}
					</form.Field>
				))}

				<FormSubmitButton
					form={form}
					isLoading={isLoading}
					submitText={submitText}
					loadingText={loadingText}
				/>

				<FormFeedback
					isError={isError}
					isSuccess={isSuccess}
					errorMessage={errorMessage}
					successMessage={successMessage}
				/>
			</form>
		</Card>
	);
};
