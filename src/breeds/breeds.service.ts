import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { }

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    return await this.breedRepository.findOneBy({ id });
  }
  async validateBreed(breed: Breed) {
    const breedFounded = await this.breedRepository.findOne({
      where: {
        id: breed.id,
      }
    })
    if (!breedFounded) throw new NotFoundException('Breed not found');
    return breedFounded;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    const breed = await this.breedRepository.findOneBy({ id });
    if (!breed) throw new NotFoundException('Breed not found');
    return await this.breedRepository.save({
      ...breed,
      ...updateBreedDto,
    })
  }

}
