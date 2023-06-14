import { PickType } from '@nestjs/mapped-types';
import { Department } from 'src/entities/Department.entity';

export class FindOneDepartmentDTO extends PickType(Department, [
  'department_id',
]) {}
