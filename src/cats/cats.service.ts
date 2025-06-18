import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interfaces';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) { }


  async create(createCat: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.breedRepository.findOne({
      where: {
        name: createCat.breed,
      }
    });
    if (!breed) {
      throw new NotFoundException('Breed not found');
    }
    return await this.catRepository.save({
      ...createCat,
      breed: breed,
      // user: { id: Number(user.id) }, // Ensure id is a number
      userEmail: user.email,
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === 'admin') {
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where: {
        userEmail: user.email,
      }
    })
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }
    if (cat.userEmail !== user.email && user.role !== 'admin') {
      throw new BadRequestException('You do not have permission to access this cat');
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    const foundedCat = await this.catRepository.findOneBy({ id });
    if (!foundedCat) throw new NotFoundException('Cat not found');
    if (foundedCat.userEmail !== user.email) {
      throw new BadRequestException('You do not have permission to update this cat');
    }
    await this.catRepository.update(id, {
      ...foundedCat,
      ...updateCatDto,
    });
    return await this.catRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
