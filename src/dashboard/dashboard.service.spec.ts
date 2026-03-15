import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let prisma: PrismaService;

  const mockPrismaService = {
    order: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDailySales', () => {
    it('should return aggregated sales data for paid orders', async () => {
      const mockOrders = [
        { totalCents: 500, paymentMethod: 'card' },
        { totalCents: 300, paymentMethod: 'cash' },
        { totalCents: 700, paymentMethod: 'card' },
      ];

      mockPrismaService.order.findMany.mockResolvedValue(mockOrders);

      const result = await service.getDailySales('2024-01-15');

      expect(result).toEqual({
        total_revenue_cents: 1500,
        order_count: 3,
        card_total_cents: 1200,
        cash_total_cents: 300,
        card_order_count: 2,
        cash_order_count: 1,
      });

      expect(mockPrismaService.order.findMany).toHaveBeenCalledWith({
        where: {
          status: 'paid',
          createdAt: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
        },
        select: {
          totalCents: true,
          paymentMethod: true,
        },
      });
    });

    it('should return zeros when no orders exist', async () => {
      mockPrismaService.order.findMany.mockResolvedValue([]);

      const result = await service.getDailySales();

      expect(result).toEqual({
        total_revenue_cents: 0,
        order_count: 0,
        card_total_cents: 0,
        cash_total_cents: 0,
        card_order_count: 0,
        cash_order_count: 0,
      });
    });

    it('should default to today when no date provided', async () => {
      mockPrismaService.order.findMany.mockResolvedValue([]);

      await service.getDailySales();

      const callArgs = mockPrismaService.order.findMany.mock.calls[0][0];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(callArgs.where.createdAt.gte.toDateString()).toBe(today.toDateString());
    });
  });
});
