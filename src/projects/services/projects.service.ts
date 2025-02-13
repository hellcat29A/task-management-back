import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, userId } = createProjectDto;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const project = this.projectRepository.create({
      name,
      description,
      userId,
    });

    return await this.projectRepository.save(project);
  }
}
