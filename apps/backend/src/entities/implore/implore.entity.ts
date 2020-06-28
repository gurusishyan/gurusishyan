import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  Column,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { VibeEntity } from '../vibes/vibes.entity';
import { MetadataDTO } from '../metadata/metadata.class';
import { ImploreRO } from '../../app/implore/implore.dto';

@Entity({ name: 'implore' })
export class ImploreEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'implore_id' }) implore_id: string;

  @CreateDateColumn({
    name: 'created',
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  })
  created: string;

  @OneToOne((type) => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'author' })
  author: UserEntity;

  @Column('boolean', { name: 'implore_as_anonymous', default: false })
  implore_as_anonymous: boolean;

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

  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];

  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable()
  views: UserEntity[];

  toResponseObject = (): ImploreRO => {
    const {
      implore_id,
      created,
      implore_as_anonymous,
      implore_type,
      upvotes,
      downvotes,
      views,
      status,
      associated_vibe,
      metadata,
    } = this;

    return {
      implore_id,
      created,
      implore_as_anonymous,
      implore_type,
      upvotes: upvotes.length,
      downvotes: downvotes.length,
      views: views.length,
      status,
      associated_vibe,
      metadata,
    };
  };
}
