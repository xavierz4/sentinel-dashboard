
import { User } from '@models/User';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from "@shared/theme/icons";
import { ColumnDef } from '@tanstack/react-table';
import { useUser } from '@modules/user/hooks/useUser';
import { Button, Card, DataTable } from '@shared/components';

export const UserAdminPage = () => {
	const { getAll } = useUser();
	const navigate = useNavigate();
	const { data, isLoading, error } = getAll();

	const userColumns: ColumnDef<User>[] = [
		{
			accessorKey: 'id',
			header: 'ID',
		},
		{
			accessorKey: 'username',
			header: 'Usuario',
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'role',
			header: 'Rol',
		},
	];

	if (isLoading) return <div>Cargando ...</div>;
	if (error) return <div>Error: {String((error as Error)?.message || error)}</div>;

	return (
		<Card>
			<div className="flex items-center justify-between mb-4">
				<h2>Lista de Usuarios</h2>
				<Button size='sm' startIcon={<PlusIcon />} onClick={() => navigate('create')}>
					Nuevo Usuario
				</Button>
			</div>
			
			<DataTable<User>
				data={data ?? []}
				columns={userColumns}
			/>
		</Card>
	);
};
