import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('teams')
export class TeamsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships

  // A team has one tech lead (user)
  @ManyToOne(() => UserEntity, (user) => user.leadingTeams)
  @JoinColumn({ name: 'techLeadId' })
  techLead: UserEntity;

  @Column()
  techLeadId: number; // Foreign key to enforce one tech lead per team

  // A team can have many members (users)
  @ManyToMany(() => UserEntity, (user) => user.teams)
  members: UserEntity[];
}
