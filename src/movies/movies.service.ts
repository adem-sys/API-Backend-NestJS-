import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return this.moviesRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    await this.moviesRepository.update(id, updateMovieDto);
    return this.moviesRepository.findOneBy({ id });
  }

  remove(id: number): Promise<void> {
    return this.moviesRepository.delete(id).then(() => undefined);
  }
}
