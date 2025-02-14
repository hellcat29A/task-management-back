import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';

import { UsersModule } from 'src/users/users.module';
import { ProjectsEntity } from 'src/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity]), UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
