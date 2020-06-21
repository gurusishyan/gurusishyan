import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' }) user_id: string;

  @Column('varchar', { length: 35, name: 'user_name' }) user_name: string;

  @Column('enum', { enum: ['GURU', 'ADMIN', 'SISHYAN'], name: 'user_role' })
  user_role: string;
}
