import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movie', async () => {
    const movie = {
      id: 1,
      title: 'Test Movie',
      description: 'Test Description',
      director: 'Test Director',
      releaseDate: new Date(),
    };

    jest.spyOn(repository, 'save').mockResolvedValue(movie as any);

    expect(await service.create(movie)).toBe(movie);
  });

  // Ajoutez des tests supplémentaires pour les autres méthodes ici
});