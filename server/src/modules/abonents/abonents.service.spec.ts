import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AbonentsService } from './abonents.service';
import { Abonent, AbonentDocument } from './schemas/abonent.schema';
import {
  mockAbonent,
  mockArrayOfCities,
  mockColumnName,
  mockId,
  mockQueryParams,
} from './mocks/testingMocks';

describe('abonents service', () => {
  let service: AbonentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbonentsService,
        {
          provide: getModelToken(Abonent.name),
          useValue: Model<AbonentDocument>,
        },
      ],
    }).compile();

    service = module.get<AbonentsService>(AbonentsService);
  });

  test('Добавить абонента', async () => {
    jest
      .spyOn(service, 'createAbonent')
      .mockImplementation(async () => mockAbonent);
    expect(await service.createAbonent(mockAbonent)).toEqual(mockAbonent);
  });

  test('Удалить абонента', async () => {
    jest.spyOn(service, 'deleteAbonent').mockImplementation(async () => null);
    expect(await service.deleteAbonent(mockId)).toEqual(null);
  });

  test('Получить уникальные значения столбца по его ключу', async () => {
    jest
      .spyOn(service, 'getUniqueColumnValues')
      .mockImplementation(async () => mockArrayOfCities);
    expect(await service.getUniqueColumnValues(mockColumnName)).toEqual(
      mockArrayOfCities,
    );
  });

  test('Получить всех абонентов по параметрам', async () => {
    jest.spyOn(service, 'fetchAllAbonents').mockImplementation(async () => ({
      findedAbonents: [mockAbonent, mockAbonent, mockAbonent],
      totalAbonents: 3,
    }));
    expect(await service.fetchAllAbonents(mockQueryParams)).toEqual({
      findedAbonents: [mockAbonent, mockAbonent, mockAbonent],
      totalAbonents: 3,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
