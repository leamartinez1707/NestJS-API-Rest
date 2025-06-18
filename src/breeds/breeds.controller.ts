import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/common/role.enum';
import { Breed } from './entities/breed.entity';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Auth(Role.User)
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) { }

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @Get()
  validateBreed(@Body('breed') breed: Breed) {
    return this.breedsService.validateBreed(breed);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.breedsService.remove(id);
  // }
}
