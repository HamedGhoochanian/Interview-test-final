import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class IdValidator {
  @IsString()
  id: string;
}

export class NameValidator {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PostValidator {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}

export class UpdatePostValidator {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author: string;
}
