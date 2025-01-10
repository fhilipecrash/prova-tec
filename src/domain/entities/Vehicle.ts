export class Vehicle {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly email: string,
      public readonly cpf: string,
      public readonly password: string,
      public readonly carPlate?: string,
    ) {}
  }
  