import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { VibeEntity } from '../vibes/vibes.entity';
import { MetadataDTO } from '../metadata/metadata.class';

@Entity({ name: 'implore' })
export class ImploreEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'implore_id' }) implore_id: string;

  @CreateDateColumn({
    name: 'created',
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  })
  created: string;

  @OneToOne((type) => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'implore_by' })
  implore_by: UserEntity;

  @Column('boolean', { name: 'implore_as_anonymous', default: false })
  implore_as_anonymous: Boolean;

  @OneToMany((type) => VibeEntity, (vibe) => vibe.vibe_id)
  @JoinColumn({ name: 'associated_vibe' })
  associated_vibe: Array<VibeEntity>;

  @Column('enum', { name: 'implore_type', enum: ['QUESTION,NOTES'] })
  implore_type: string;

  @Column('jsonb', { name: 'metadata' }) metadata: MetadataDTO;

  @Column('enum', {
    name: 'status',
    enum: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'],
  })
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
}
