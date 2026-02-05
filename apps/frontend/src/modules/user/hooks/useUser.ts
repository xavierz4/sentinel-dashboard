import { User } from '@models/User';
import { useRepository } from '@core/useRepository';
import { GenericRepository } from '@core/GenericRepository';
import { USER_ENDPOINTS } from '@shared/constants/userEndpoints';

// User interface importada desde shared/models/User

export type UserPayload = Partial<Omit<User, 'id'>>;

const userRepository = new GenericRepository<User, UserPayload>(USER_ENDPOINTS.base);

export function useUser() {
  return useRepository(userRepository);
}
