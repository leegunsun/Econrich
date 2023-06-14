import { PickType } from '@nestjs/mapped-types';
import { Employee } from 'src/entities/Employee.entity';

export class FindOneEmployeeDTO extends PickType(Employee, ['employee_id']) {}
