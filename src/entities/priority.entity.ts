import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TasksEntity } from './task.entity';

@Entity('priorities')
export class PrioritiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TasksEntity, (task) => task.priority)
  tasks: TasksEntity[];
}
