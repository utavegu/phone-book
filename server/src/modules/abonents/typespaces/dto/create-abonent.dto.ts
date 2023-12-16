import {
  IsString,
  IsInt,
  IsEmail,
  Length,
  Min,
  Max,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreateAbonentDto {
  @IsString()
  @Length(2, 20)
  surname: string;

  @IsString()
  @Length(2, 20)
  name: string;

  @IsString()
  @Length(2, 20)
  patronymic?: string;

  @IsPhoneNumber('RU')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 50)
  @IsOptional()
  city?: string;

  @IsString()
  @Length(2, 50)
  @IsOptional()
  street?: string;

  @IsInt()
  @Min(1)
  @Max(300)
  @IsOptional()
  house?: number;

  @IsInt()
  @Min(1)
  @Max(5000)
  @IsOptional()
  flat?: number;
}
