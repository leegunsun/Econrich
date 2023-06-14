import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneEmployeeDTO } from './dto/employee.dto';
import { Employee } from '../entities/Employee.entity';
import { JobHistory } from '../entities/Job_history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(JobHistory)
    private jobHistory: Repository<JobHistory>,
  ) {}

  /**
   * 1. 사원 id를 입력하면 정보를 볼 수 있습니다.
   *
   * @param FindOneEmployeeDTO
   * @returns
   */
  async findOneEmployeeData(
    FindOneEmployeeDTO: FindOneEmployeeDTO,
  ): Promise<Employee> {
    const { employee_id }: FindOneEmployeeDTO = FindOneEmployeeDTO;

    const FindOneData: Employee = await this.employeeRepository
      .createQueryBuilder('e')
      .where('e.employee_id = :employee_id', { employee_id })
      .select([
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'hire_date',
        'job_id',
        'salary',
        'commission_pct',
      ])
      .getRawOne();

    if (!FindOneData) {
      throw new BadRequestException(
        '입력한 아이디의 사원이 존재하지 않습니다.',
      );
    }

    return FindOneData;
  }

  /**
   * 2. 사원 id를 입력하면 이력을 볼 수 있습니다.
   *
   * @param FindOneEmployeeDTO
   * @returns
   */
  async findOneEmployeeHistory(
    FindOneEmployeeDTO: FindOneEmployeeDTO,
  ): Promise<JobHistory> {
    const { employee_id }: FindOneEmployeeDTO = FindOneEmployeeDTO;

    const FindOneData: JobHistory = await this.jobHistory
      .createQueryBuilder('j')
      .where('j.employee_id = :employee_id', { employee_id })
      .select(['start_date', 'end_date', 'job_id'])
      .getRawOne();

    if (!FindOneData) {
      throw new BadRequestException(
        '입력한 아이디의 사원이 존재하지 않습니다.',
      );
    }

    return FindOneData;
  }
}
