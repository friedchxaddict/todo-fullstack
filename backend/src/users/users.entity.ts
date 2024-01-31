import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;
}
