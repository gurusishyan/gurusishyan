import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../app/auth/constants';
import { UserRO } from '../../app/user/user.dto';
import { ImploreEntity, VibeEntity } from '../';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' }) user_id: string;

  @Column('varchar', { length: 35, name: 'user_name' }) user_name: string;

  @Column('varchar', {
    name: 'created',
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  })
  created: string;

  @ManyToMany((type) => ImploreEntity, { cascade: true })
  @JoinTable()
  bookmarked_implores: ImploreEntity[];

  @ManyToMany((type) => VibeEntity, { cascade: true })
  @JoinTable()
  bookmarked_vibes: VibeEntity[];

  @Column('enum', {
    enum: ['GURU', 'ADMIN', 'SISHYAN', 'OTHERS'],
    name: 'user_role',
    default: 'OTHERS',
  })
  user_role: string;

  @Column('varchar', { name: 'user_email' })
  user_email: string;

  @Column('varchar', { name: 'password', nullable: true, select: false })
  password: string;

  @BeforeInsert()
  hashPassword = () => {
    if (this.password) {
      this.password = crypto
        .createHash('sha256')
        .update(this.password)
        .digest('hex');
    }
  };

  toResponseObject = (shouldSendToken: boolean = true): UserRO => {
    const {
      user_id,
      user_name,
      user_role,
      created,
      user_email,
      token,
      bookmarked_implores,
      bookmarked_vibes,
    } = this;
    if (shouldSendToken)
      return {
        user_id,
        user_name,
        user_role,
        created,
        user_email,
        token,
        bookmarked_vibes,
        bookmarked_implores,
      };
    else {
      return {
        user_id,
        user_name,
        user_role,
        created,
        user_email,
        bookmarked_vibes,
        bookmarked_implores,
      };
    }
  };

  comparePassword = (password) => {
    console.log(this.password);
    return password === this.password;
  };

  get token() {
    const { user_name, user_id, user_role, user_email } = this;
    return jwt.sign(
      { user_name, user_id, user_role, user_email },
      jwtConstants.secret,
      { expiresIn: '7d' }
    );
  }
}
