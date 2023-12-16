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

// TODO: not any

@Controller('abonents')
export class AbonentsController {
  constructor(private readonly abonentsService: AbonentsService) {}

  @Post()
  createAbonent(@Body() createAbonentDto: CreateAbonentDto): Promise<Abonent> {
    return this.abonentsService.createAbonent(createAbonentDto);
  }

  @Get()
  fetchAllAbonents(@Query() queryParams: any): Promise<Abonent[]> {
    return this.abonentsService.fetchAllAbonents(queryParams);
  }

  @Get(':id')
  findAbonentById(@Param('id') id: number): Promise<Abonent> {
    return this.abonentsService.findAbonentById(id);
  }

  @Delete()
  deleteAbonent(id: number): Promise<void> {
    return this.abonentsService.deleteAbonent(id);
  }
}
