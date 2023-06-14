import { PickType } from '@nestjs/mapped-types';
import { Department } from 'src/entities/Department.entity';

export class UpdateDepartmentSalaryDTO extends PickType(Department, [
  'department_id',
]) {}
