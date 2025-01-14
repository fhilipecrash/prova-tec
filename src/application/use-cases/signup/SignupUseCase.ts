import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/interfaces/UserRepository'

interface SignupRequest {
  name: string
  email: string
  cpf: string
  password: string
  carPlate?: string
  isPassenger: boolean
  isDriver: boolean
}

export class SignupUseCase {
  constructor(private accountRepository: UserRepository) {}

  async execute(request: SignupRequest): Promise<void> {
    const existingUser = await this.accountRepository.findByEmail(request.email)
    if (existingUser) {
      throw new Error('Email already in use')
    }

    const account = new User(
      this.generateId(),
      request.name,
      request.email,
      request.cpf,
      request.password,
      request.isPassenger,
      request.isDriver,
      request.carPlate,
    )

    await this.accountRepository.save(account)
  }

  private generateId(): string {
    return 'unique-id'
  }
}
