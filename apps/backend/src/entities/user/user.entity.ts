import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../app/auth/constants';
import { UserRO } from '../../app/user/user.dto';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' }) user_id: string;

  @Column('varchar', { length: 35, name: 'user_name' }) user_name: string;

  @Column('varchar', {
    name: 'created',
    default: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  })
  created: string;

  @Column('enum', { enum: ['GURU', 'ADMIN', 'SISHYAN'], name: 'user_role' })
  user_role: string;

  @Column('varchar', { name: 'user_email' })
  user_email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @BeforeInsert()
  hashPassword = () => {
    this.password = crypto
      .createHash('sha256')
      .update(this.password)
      .digest('hex');
  };

  toResponseObject = (shouldSendToken: boolean = true): UserRO => {
    const { user_id, user_name, user_role, created, user_email, token } = this;
    if (shouldSendToken)
      return { user_id, user_name, user_role, created, user_email, token };
    else {
      return { user_id, user_name, user_role, created, user_email };
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
      { expiresIn: '1h' }
    );
  }
}
