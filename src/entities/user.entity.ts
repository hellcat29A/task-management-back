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
import { ProjectsEntity } from './project.entity';
import { TasksEntity } from './task.entity';
import { RolesEntity } from './role.entity';
import { TeamsEntity } from './team.entity';
import { CommentsEntity } from './comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships

  // A user can create many projects
  @OneToMany(() => ProjectsEntity, (project) => project.createdBy)
  createdProjects: ProjectsEntity[];

  // A user can be assigned to many projects
  @OneToMany(() => ProjectsEntity, (project) => project.assignedTo)
  assignedProjects: ProjectsEntity[];

  // A user can create many tasks
  @OneToMany(() => TasksEntity, (task) => task.createdBy)
  createdTasks: TasksEntity[];

  // A user can be assigned to many tasks
  @OneToMany(() => TasksEntity, (task) => task.assignedTo)
  assignedTasks: TasksEntity[];

  // A user belongs to one role
  @ManyToOne(() => RolesEntity, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'roleId' }) // Explicitly define the foreign key column
  role: RolesEntity;

  @Column({ nullable: false })
  roleId: number; // Foreign key to enforce one role per user

  // A user can lead many teams
  @OneToMany(() => TeamsEntity, (team) => team.techLead)
  leadingTeams: TeamsEntity[];

  // A user can be a member of many teams
  @ManyToMany(() => TeamsEntity, (team) => team.members)
  @JoinTable({
    name: 'team_members', // Name of the join table
    joinColumn: { name: 'userId', referencedColumnName: 'id' }, // Column for user ID
    inverseJoinColumn: { name: 'teamId', referencedColumnName: 'id' }, // Column for team ID
  })
  teams: TeamsEntity[];

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[];
}
