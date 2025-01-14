import { SignupUseCase } from '../src/application/use-cases/signup/SignupUseCase'
import { InMemoryUserRepository } from '../src/infra/repositories/InMemoryUserRepository'

describe('SignupUseCase', () => {
  it('should create a new account', async () => {
    const accountRepository = new InMemoryUserRepository()
    const signupUseCase = new SignupUseCase(accountRepository)

    await signupUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'securepassword',
      isPassenger: true,
      isDriver: false,
    })

    const account = await accountRepository.findByEmail('john@example.com')
    expect(account).toBeTruthy()
    expect(account?.name).toBe('John Doe')
  })

  it('should not allow duplicate emails', async () => {
    const accountRepository = new InMemoryUserRepository()
    const signupUseCase = new SignupUseCase(accountRepository)

    await signupUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678901',
      password: 'securepassword',
      isPassenger: true,
      isDriver: false,
    })

    await expect(
      signupUseCase.execute({
        name: 'Jane Doe',
        email: 'john@example.com',
        cpf: '10987654321',
        password: 'anotherpassword',
        isPassenger: true,
        isDriver: false,
      }),
    ).rejects.toThrow('Email already in use')
  })
}) 
