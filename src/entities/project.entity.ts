import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TasksEntity } from './task.entity';

@Entity('projects')
export class ProjectsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.createdProjects)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.assignedProjects)
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: UserEntity;

  @OneToMany(() => TasksEntity, (task) => task.project)
  tasks: TasksEntity[];
}
