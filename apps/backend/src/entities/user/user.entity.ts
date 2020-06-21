import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') user_id: string;

  @Column('varchar', { length: 35 }) user_name: string;

  @Column('enum',{enum:["GURU",'ADMIN','SISHYAN']}) user_role:string

  
}
