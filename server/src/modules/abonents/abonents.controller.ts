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
import { IdValidationPipe } from 'src/validation/id-validation.pipe';
import { CreateAbonentDto } from './typespaces/dto/create-abonent.dto';
import { IQueryParams } from './typespaces/interfaces/IQueryParams';
import { ID } from './typespaces/types/id';

@Controller('abonents')
export class AbonentsController {
  constructor(private readonly abonentsService: AbonentsService) {}

  @Post()
  createAbonent(@Body() createAbonentDto: CreateAbonentDto): Promise<Abonent> {
    return this.abonentsService.createAbonent(createAbonentDto);
  }

  @Get()
  fetchAllAbonents(
    @Query() queryParams: IQueryParams,
  ): Promise<{ findedAbonents: Abonent[]; totalAbonents: number }> {
    return this.abonentsService.fetchAllAbonents(queryParams);
  }

  @Get('column/:columnName')
  getUniqueColumnValues(
    @Param('columnName') columnName: string,
  ): Promise<string[]> {
    return this.abonentsService.getUniqueColumnValues(columnName);
  }

  @Delete(':id')
  deleteAbonent(@Param('id', IdValidationPipe) id: ID): Promise<void> {
    return this.abonentsService.deleteAbonent(id);
  }
}
