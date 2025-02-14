import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TasksEntity } from './task.entity';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  taskId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships

  // A comment belongs to one user
  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userCommentId' })
  user: UserEntity;

  @Column()
  userCommentId: number; // Foreign key to enforce the user who created the comment

  // A comment belongs to one task
  @ManyToOne(() => TasksEntity, (task) => task.comments)
  @JoinColumn({ name: 'taskCommentId' })
  task: TasksEntity;

  @Column()
  taskCommentId: number; // Foreign key to enforce the task the comment belongs to
}
