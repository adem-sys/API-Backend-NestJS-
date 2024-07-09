import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a movie', async () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      description: 'Test Description',
      director: 'Test Director',
      releaseDate: new Date(),
    };

    jest.spyOn(service, 'create').mockImplementation(async () => movie);

    expect(await controller.create(movie)).toBe(movie);
  });

});