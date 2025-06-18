import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Breed } from 'src/breeds/entities/breed.entity';

export class UpdateCatDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  breed?: Breed;
}
