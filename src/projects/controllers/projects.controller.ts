import { Body, Controller, Post } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
}
