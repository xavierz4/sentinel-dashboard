import { FormApi } from '@tanstack/react-form';

interface FormSubmitButtonProps {
	form: FormApi<any, any>; 
	isLoading?: boolean;
	loadingText?: string;
	submitText?: string;
}

export const FormSubmitButton = (props: FormSubmitButtonProps) => {
    const { form, isLoading, loadingText, submitText } = props;  
    
	return (
		<form.Subscribe
			selector={(state) => [state.canSubmit, state.isSubmitting]}
		>
			{([canSubmit, isSubmitting]: [boolean, boolean]) => (
				<button
					type="submit"
					className="inline-flex items-center justify-center gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
					disabled={!canSubmit || isSubmitting || isLoading}
				>
					{isLoading ? loadingText : submitText}
				</button>
			)}
		</form.Subscribe>
	);
};
