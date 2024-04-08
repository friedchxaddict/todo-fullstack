import { IsEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsEmpty()
  @MinLength(6)
  readonly currentPassword: string;

  @IsString()
  @IsEmpty()
  @MinLength(6)
  readonly newPassword: string;
}
