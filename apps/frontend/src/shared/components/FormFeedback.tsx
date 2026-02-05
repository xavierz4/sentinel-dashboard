import React from 'react';

interface FormFeedbackProps {
	isError?: boolean;
	isSuccess?: boolean;
	errorMessage?: string;
	successMessage?: string;
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
	isError = false,
	isSuccess = false,
	errorMessage = 'Ocurrió un error.',
	successMessage = 'Operación exitosa.',
}) => {
	return (
		<>
			{isError && (
				<div className="text-red-600 text-sm mt-4">
					{errorMessage}
				</div>
			)}

			{isSuccess && (
				<div className="text-green-600 text-sm mt-4">
					{successMessage}
				</div>
			)}
		</>
	);
};
