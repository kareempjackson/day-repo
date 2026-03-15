import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllAvailable() {
    return this.prisma.menuItem.findMany({
      where: { available: true },
      include: {
        modifiers: {
          where: { available: true },
          orderBy: { name: 'asc' },
        },
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  async findOne(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        modifiers: {
          where: { available: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async create(dto: CreateMenuItemDto) {
    return this.prisma.menuItem.create({
      data: {
        name: dto.name,
        description: dto.description,
        priceCents: dto.priceCents,
        category: dto.category,
        imageUrl: dto.imageUrl,
        available: dto.available ?? true,
      },
      include: {
        modifiers: true,
      },
    });
  }

  async update(id: string, dto: UpdateMenuItemDto) {
    await this.ensureExists(id);

    return this.prisma.menuItem.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.priceCents !== undefined && { priceCents: dto.priceCents }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.imageUrl !== undefined && { imageUrl: dto.imageUrl }),
        ...(dto.available !== undefined && { available: dto.available }),
      },
      include: {
        modifiers: {
          where: { available: true },
          orderBy: { name: 'asc' },
        },
      },
    });
  }

  async softDelete(id: string) {
    await this.ensureExists(id);

    return this.prisma.menuItem.update({
      where: { id },
      data: { available: false },
    });
  }

  private async ensureExists(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }
}
