import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AbonentsService } from './abonents.service';
import { Abonent } from './schemas/abonent.schema';
import { CreateAbonentDto } from './typespaces/dto/create-abonent.dto';
import { IQueryParams } from './typespaces/interfaces/IQueryParams';

@Controller('abonents')
export class AbonentsController {
  constructor(private readonly abonentsService: AbonentsService) {}

  @Post()
  createAbonent(@Body() createAbonentDto: CreateAbonentDto): Promise<Abonent> {
    return this.abonentsService.createAbonent(createAbonentDto);
  }

  @Get()
  fetchAllAbonents(
    @Query() queryParams: IQueryParams, // TODO: Валидировать ли вас или перебор?
  ): Promise<{ findedAbonents: Abonent[]; totalAbonents: number }> {
    return this.abonentsService.fetchAllAbonents(queryParams);
  }

  @Get('column/:columnName')
  getUniqueColumnValues(
    @Param('columnName') columnName: string,
  ): Promise<string[]> {
    return this.abonentsService.getUniqueColumnValues(columnName);
  }

  // TODO: id validation pipe
  @Delete(':id')
  deleteAbonent(@Param('id') id: number): Promise<void> {
    return this.abonentsService.deleteAbonent(id);
  }
}
