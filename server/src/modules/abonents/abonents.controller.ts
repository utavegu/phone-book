import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AbonentsService } from './abonents.service';

// TODO: not any

@Controller('abonents')
export class AbonentsController {
  constructor(private readonly abonentsService: AbonentsService) {}

  @Post()
  createAbonent(@Body() createAbonentDto: any): Promise<any> {
    return this.abonentsService.createAbonent(createAbonentDto);
  }

  @Get()
  fetchAllAbonents(): Promise<any[]> {
    return this.abonentsService.fetchAllAbonents();
  }

  @Get(':id')
  findAbonentById(@Param('id') id: number): Promise<Omit<any, 'passwordHash'>> {
    return this.abonentsService.findAbonentById(id);
  }

  @Put()
  updateAbonent(
    @Param('id') id: number,
    @Body() updateUserDto: any,
  ): Promise<Omit<any, 'passwordHash'>> {
    return this.abonentsService.updateAbonent(id, updateUserDto);
  }

  @Delete()
  deleteAbonent(id: number): Promise<void> {
    return this.abonentsService.deleteAbonent(id);
  }
}
