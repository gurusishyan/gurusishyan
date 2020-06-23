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
import { ImploreEntity } from '../implore/implore.entity';
import { MetadataDTO } from '../metadata/metadata.class';

@Entity({ name: 'vibe' })
export class VibeEntity {
  constructor(){}
  @PrimaryGeneratedColumn('uuid', { name: 'vibe_id' }) vibe_id: string;

  @CreateDateColumn({ name: 'created' }) created: Date;

  @OneToOne((type) => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'vibe_by' })
  vibe_by: UserEntity;

  @Column('boolean', { name: 'vibe_as_anonymous', default: false })
  vibe_as_anonymous: Boolean;

  @OneToOne((type) => ImploreEntity, (implore) => implore.implore_id)
  @JoinColumn({ name: 'associated_implore' })
  associated_implore: ImploreEntity;

  @Column('enum', {
    name: 'vibe_type',
    enum: { ANSWER: 'ANSWER', NOTES: 'NOTES' },
  })
  vibe_type: string;

  @Column('jsonb', { name: 'metadata' }) metadata: MetadataDTO;
}
