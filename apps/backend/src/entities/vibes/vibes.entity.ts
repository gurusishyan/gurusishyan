import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ImploreEntity } from '../implore/implore.entity';
import { MetadataDTO } from '../metadata/metadata.class';

@Entity({ name: 'vibe' })
export class VibeEntity {
  constructor() {}
  @PrimaryGeneratedColumn('uuid', { name: 'vibe_id' }) vibe_id: string;

  @CreateDateColumn({
    name: 'created',
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  })
  created: string;

  @OneToOne((type) => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'author' })
  author: UserEntity;

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

  @Column('enum', {
    name: 'status',
    enum: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'],
    default: 'UNDER_REVIEW',
  })
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];

  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable()
  views: UserEntity[];
}
