import { Account } from '../../../domain/entities/Account'
import { AccountRepository } from '../../../domain/interfaces/AccountRepository'

interface SignupRequest {
  name: string
  email: string
  cpf: string
  password: string
  carPlate?: string
}

export class SignupUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(request: SignupRequest): Promise<void> {
    const existingAccount = await this.accountRepository.findByEmail(request.email)
    if (existingAccount) {
      throw new Error('Email already in use')
    }

    const account = new Account(
      this.generateId(),
      request.name,
      request.email,
      request.cpf,
      request.password,
      request.carPlate,
    )

    await this.accountRepository.save(account)
  }

  private generateId(): string {
    return 'unique-id' 
  }
}