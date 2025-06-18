import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { BreedsModule } from './breeds/breeds.module';
import configuration from './config/configuration';
import { Breed } from './breeds/entities/breed.entity';
import { Cat } from './cats/entities/cat.entity';

@Module({
  imports: [
    CatsModule,
    UsersModule,
    AuthModule,
    BreedsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.name,
      entities: [User, Breed, Cat],
      synchronize: true, // Note: set to false in production
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env.local', // Load environment variables from .env file
      load: [configuration],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSoruce: DataSource) {
    // This constructor is used to initialize the DataSource
    // It can be used to run migrations or other database setup tasks
  }
}
