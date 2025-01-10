import { User } from '../entities/User'

export interface UserRepository {
  save(account: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
}
