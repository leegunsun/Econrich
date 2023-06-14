import { Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentFindOnePipe } from './pipe/department.pipe';
import { FindOneDepartmentDTO } from './dto/department.dto';
import { Department } from '../entities/Department.entity';
import { Location } from '../entities/Locations.entity';
import { Region } from 'src/entities/Region.entity';
import { Country } from 'src/entities/Countrie.entity';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  /**
   * 1. 부서 아이디 입력하면 Location & Country & Region을 LeftJoin해서 return
   *
   * @param FindOneDepartmentDTO
   * @returns
   */
  @Get('/data/:department_id')
  async findDepartment(
    @Param(DepartmentFindOnePipe) FindOneDepartmentDTO: FindOneDepartmentDTO,
  ): Promise<Department & Location & Country & Region> {
    return await this.departmentService.findDepartment(FindOneDepartmentDTO);
  }
}
