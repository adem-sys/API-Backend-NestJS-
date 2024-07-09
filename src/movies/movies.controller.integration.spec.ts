import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Movie>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movies (POST)', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({ title: 'Test Movie', description: 'Test Description' })
      .expect(201)
      .then(response => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toEqual('Test Movie');
      });
  });

  it('/movies (GET)', async () => {
    const movie = await repository.save({ title: 'Test Movie', description: 'Test Description' });

    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .then(response => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toEqual('Test Movie');
      });
  });

  // Add more tests for findOne, update, and delete
});
