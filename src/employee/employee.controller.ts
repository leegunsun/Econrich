import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { FindOneEmployeeDTO } from './dto/employee.dto';
import { Employee } from '../entities/Employee.entity';
import { JobHistory } from '../entities/Job_history.entity';
import { EmployeeFindOnePipe } from './pipe/employee.pipe';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  /**
   * 1. 사원 id를 입력하면 정보를 볼 수 있습니다.
   *
   * @param FindOneEmployeeDTO
   * @returns
   */
  @Post('/data')
  async findOneEmployeeData(
    @Body(EmployeeFindOnePipe) FindOneEmployeeDTO: FindOneEmployeeDTO,
  ): Promise<Employee> {
    return await this.employeeService.findOneEmployeeData(FindOneEmployeeDTO);
  }

  /**
   * 2. 사원 id를 입력하면 이력을 볼 수 있습니다.
   *
   * @param FindOneEmployeeDTO
   * @returns
   */
  @Post('/history')
  async findEmployeeHistory(
    @Body(EmployeeFindOnePipe) FindOneEmployeeDTO: FindOneEmployeeDTO,
  ): Promise<JobHistory> {
    return await this.employeeService.findOneEmployeeHistory(
      FindOneEmployeeDTO,
    );
  }
}
