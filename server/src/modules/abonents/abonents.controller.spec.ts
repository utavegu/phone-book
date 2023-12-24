/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AbonentsController } from './abonents.controller';
import { AbonentsService } from './abonents.service';
import {
  mockAbonent,
  mockArrayOfCities,
  mockColumnName,
  mockId,
  mockQueryParams,
} from './mocks/testingMocks';

describe('Abonents', () => {
  let app: INestApplication;
  const abonentsService = {
    createAbonent: jest.fn((_data) => mockAbonent),
    fetchAllAbonents: jest.fn((_mockQueryParams) => [
      mockAbonent,
      mockAbonent,
      mockAbonent,
    ]),
    deleteAbonent: jest.fn((_id) => ''),
    getUniqueColumnValues: jest.fn((_columnName) => mockArrayOfCities),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AbonentsController],
      providers: [AbonentsService],
    })
      .overrideProvider(AbonentsService)
      .useValue(abonentsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/abonents (POST)`, () => {
    return request(app.getHttpServer())
      .post('/abonents')
      .expect(201)
      .expect(abonentsService.createAbonent(mockAbonent));
  });

  it(`/abonents/:id (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/abonents/${mockId}`)
      .expect(200)
      .expect(abonentsService.deleteAbonent(mockId));
  });

  it(`/abonents/column/:columnName (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/abonents/column/${mockColumnName}`)
      .expect(200)
      .expect(abonentsService.getUniqueColumnValues(mockColumnName));
  });

  it(`/abonents (GET)`, () => {
    return request(app.getHttpServer())
      .get('/abonents')
      .expect(200)
      .expect(abonentsService.fetchAllAbonents(mockQueryParams));
  });

  afterAll(async () => {
    await app.close();
  });
});
