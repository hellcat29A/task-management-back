import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TasksEntity } from './task.entity';

@Entity('attachments')
export class AttachmentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: number;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column()
  fileType: string;

  @Column()
  fileSize: number;

  @CreateDateColumn()
  uploadedAt: Date;

  // Many-to-many relationship with TasksEntity
  @ManyToMany(() => TasksEntity, (task) => task.attachments)
  tasks: TasksEntity[];
}
