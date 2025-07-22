// src/user/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'active' }) // ✅ Set default value here
  status: string;
  
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];
}
