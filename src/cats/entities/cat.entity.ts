import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Cat {
  // @PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @DeleteDateColumn()
  deletedAt: Date;

  //   @ManyToOne(() => Breed, (breed) => breed.id, {
  //     eager: true, // para que traiga las raza al hacer un findOne
  //   })
  //   breed: Breed;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
