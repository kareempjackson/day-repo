import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuCategory } from './enums/menu-category.enum';

describe('MenuItemsController', () => {
  let controller: MenuItemsController;
  let service: MenuItemsService;

  const mockMenuItem = {
    id: 'test-id-1',
    name: 'Latte',
    description: 'Creamy espresso with steamed milk',
    priceCents: 450,
    category: MenuCategory.COFFEE,
    imageUrl: null,
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    modifiers: [
      {
        id: 'mod-1',
        name: 'Extra Shot',
        priceCents: 75,
        available: true,
        menuItemId: 'test-id-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  const mockMenuItemsService = {
    findAllAvailable: jest.fn().mockResolvedValue([mockMenuItem]),
    findOne: jest.fn().mockResolvedValue(mockMenuItem),
    create: jest.fn().mockResolvedValue(mockMenuItem),
    update: jest.fn().mockResolvedValue(mockMenuItem),
    softDelete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuItemsController],
      providers: [
        {
          provide: MenuItemsService,
          useValue: mockMenuItemsService,
        },
      ],
    }).compile();

    controller = module.get<MenuItemsController>(MenuItemsController);
    service = module.get<MenuItemsService>(MenuItemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return array of available menu items with modifiers', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockMenuItem]);
      expect(service.findAllAvailable).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single menu item by id', async () => {
      const result = await controller.findOne('test-id-1');

      expect(result).toEqual(mockMenuItem);
      expect(service.findOne).toHaveBeenCalledWith('test-id-1');
    });
  });

  describe('create', () => {
    it('should create a new menu item', async () => {
      const createDto: CreateMenuItemDto = {
        name: 'Latte',
        description: 'Creamy espresso with steamed milk',
        priceCents: 450,
        category: MenuCategory.COFFEE,
      };

      const result = await controller.create(createDto);

      expect(result).toEqual(mockMenuItem);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update a menu item', async () => {
      const updateDto: UpdateMenuItemDto = {
        name: 'Updated Latte',
        priceCents: 500,
      };

      const result = await controller.update('test-id-1', updateDto);

      expect(result).toEqual(mockMenuItem);
      expect(service.update).toHaveBeenCalledWith('test-id-1', updateDto);
    });
  });

  describe('remove', () => {
    it('should soft delete a menu item', async () => {
      await controller.remove('test-id-1');

      expect(service.softDelete).toHaveBeenCalledWith('test-id-1');
    });
  });
});
