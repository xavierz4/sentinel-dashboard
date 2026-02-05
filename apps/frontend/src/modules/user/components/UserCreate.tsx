import { useUser } from '@modules/user';
import { useNavigate } from 'react-router-dom';
import { GenericForm } from '@shared/components';
import { validators } from '@shared/utils/validators';

interface UserCreateForm {
	email: string;
	password: string;
	username: string;
}

export const UserCreate = () => {
    const { create } = useUser();
    const navigate = useNavigate();

	const handleSubmit = async (value: UserCreateForm) => {
		try {
			await create.mutateAsync(value);
			navigate('/user');
		} catch (error) {
			console.error('Error al crear usuario:', error);
		}
	};

	return (
		<GenericForm<UserCreateForm>
			title="Crear Usuario"
			defaultValues={{
				email: '',
				password: '',
				username: '',
			}}
			fields={[
				{
					type: 'email',
					name: 'email',
					label: 'Email',
					placeholder: 'usuario@correo.com',
					validators: { onChange: validators.email() },
				},
				{
					type: 'password',
					name: 'password',
					label: 'Password',
					placeholder: '••••••••',
					validators: { onChange: validators.minLength(6, 'La contraseña') },
				},
				{
					type: 'text',
					name: 'username',
					label: 'Username',
					placeholder: 'Nombre de usuario',
					validators: { onChange: validators.minLength(3, 'El nombre de usuario') },
				},
			]}
			onSubmit={handleSubmit}
			loadingText="Creando..."
			isError={create.isError}
			submitText="Crear Usuario"
			isLoading={create.isPending}
			isSuccess={create.isSuccess}
			successMessage="Usuario creado correctamente."
			errorMessage="Ocurrió un error al crear el usuario."
		/>
	);
};
