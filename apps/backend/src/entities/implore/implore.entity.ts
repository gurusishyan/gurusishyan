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

export class IMetadata {
  class_of_study: string;
  subject_interested: string;
  board_of_education: string;
  lesson_on_subject: string;
  additional_notes: string;
  document_attached: boolean;
  document_url: string;
  upvotes: number;
  downvotes: number;
}

@Entity({ name: 'implore' })
export class ImploreEntity {
  @PrimaryGeneratedColumn('uuid') implore_id: string;

  @CreateDateColumn() created: Date;

  @OneToOne((type) => UserEntity, (user) => user.user_id)
  implore_by: UserEntity;

  @Column('boolean', { name: 'implore_as_anonymous', default: false })
  implore_as_anonymous: Boolean;

  @ManyToOne((type) => VibeEntity, (vibe) => vibe)
  @JoinColumn({name:'associated_vibe'})
  associated_vibe: Array<VibeEntity>;

  @Column('enum', { name: 'implore_type', enum: ['QUESTION,NOTES'] })
  implore_type: string;

  @Column('jsonb', { name: 'metadata' }) metadata: IMetadata;
}
