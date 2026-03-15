import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { DailySalesQueryDto } from './dto/daily-sales-query.dto';
import { DailySalesResponseDto } from './dto/daily-sales-response.dto';

@Controller('dashboard')
@UseGuards(AdminGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('daily')
  async getDailySales(@Query() query: DailySalesQueryDto): Promise<DailySalesResponseDto> {
    return this.dashboardService.getDailySales(query.date);
  }
}
