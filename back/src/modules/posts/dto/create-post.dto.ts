import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Public {
  ALL = 'all',
  PRIVATE = 'private',
}
export class CreatePostDto {
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(Public)
  public: Public;

  projectStartDate: Date;
  projectEndDate: Date;
  createAt: Date;
  updateAt: Date;
}
