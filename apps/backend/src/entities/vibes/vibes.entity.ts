import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ImploreEntity, IMetadata } from '../implore/implore.entity';

@Entity({ name: 'vibe' })
export class VibeEntity {
  @PrimaryGeneratedColumn('uuid') vibe_id: string;

  @CreateDateColumn() created: Date;

  @OneToOne((type) => UserEntity, (user) => user.user_id) vibe_by: UserEntity;

  @Column('boolean', { name: 'vibe_as_anonymous', default: false })
  vibe_as_anonymous: Boolean;

  @OneToOne((type) => ImploreEntity, (implore) => implore.implore_id)
  @JoinColumn({name:'associated_implore'})
  associated_implore: string;

  @Column('enum', { name: 'vibe_type', enum: {"ANSWER":"ANSWER","NOTES":"NOTES  "} })
  vibe_type: string;

  @Column('jsonb', { name: 'metadata' }) metadata: IMetadata;
}
