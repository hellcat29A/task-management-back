import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { StatusEntity } from './status.entity';
import { CategoriesEntity } from './category.entity';
import { ProjectsEntity } from './project.entity';
import { PrioritiesEntity } from './priority.entity';
import { AttachmentsEntity } from './attachment.entity';
import { CommentsEntity } from './comment.entity';

@Entity('tasks')
export class TasksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.createdTasks)
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.assignedTasks)
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: UserEntity;

  // A task has one status
  @ManyToOne(() => StatusEntity, (status) => status.tasks)
  @JoinColumn({ name: 'statusId' })
  status: StatusEntity;

  @Column({ nullable: false })
  statusId: number; // Foreign key to enforce the status of the task

  @ManyToOne(() => CategoriesEntity, (category) => category.tasks)
  @JoinColumn({ name: 'categoryId' })
  category: CategoriesEntity;

  @Column({ nullable: false })
  categoryId: number;

  @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: ProjectsEntity;

  @Column()
  projectId: number;

  @ManyToOne(() => PrioritiesEntity, (priority) => priority.tasks)
  @JoinColumn({ name: 'priorityId' })
  priority: PrioritiesEntity;

  @Column()
  priorityId: number;

  // Many-to-many relationship with AttachmentsEntity
  @ManyToMany(() => AttachmentsEntity, (attachment) => attachment.tasks)
  @JoinTable({
    name: 'task_attachments', // Name of the join table
    joinColumn: { name: 'taskId', referencedColumnName: 'id' }, // Column for task ID
    inverseJoinColumn: { name: 'attachmentId', referencedColumnName: 'id' }, // Column for attachment ID
  })
  attachments: AttachmentsEntity[];

  // A task can have multiple comments
  @OneToMany(() => CommentsEntity, (comment) => comment.task)
  comments: CommentsEntity[];
}
