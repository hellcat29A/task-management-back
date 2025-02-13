import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
