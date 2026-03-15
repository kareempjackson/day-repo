import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { MenuCategory } from '../enums/menu-category.enum';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsInt({ message: 'Price must be an integer (in cents)' })
  @Min(1, { message: 'Price must be greater than 0' })
  priceCents: number;

  @IsEnum(MenuCategory, {
    message: `Category must be one of: ${Object.values(MenuCategory).join(', ')}`,
  })
  category: MenuCategory;

  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
