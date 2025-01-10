import { User } from '../../domain/entities/User'
import { UserRepository } from '../../domain/interfaces/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private accounts: User[] = []

  async save(account: User): Promise<void> {
    this.accounts.push(account)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.accounts.find((account) => account.email === email) || null
  }
}
