import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneEmployeeDTO } from './dto/employee.dto';
import { Employee } from '../entities/Employee.entity';
import { JobHistory } from '../entities/Job_history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entities/Job.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(JobHistory)
    private jobHistoryRepository: Repository<JobHistory>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
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
      .leftJoin(Job, 'j', 'j.job_id = e.job_id')
      .select([
        'e.first_name as first_name',
        'e.last_name as last_name',
        'e.email as email',
        'e.phone_number as phone_number',
        'e.hire_date as hire_date',
        'e.salary as salary',
        'e.commission_pct as commission_pct',
        'j.job_title as job_title',
        'j.min_salary as min_salary',
        'j.max_salary as max_salary',
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

    const FindOneData: JobHistory = await this.jobHistoryRepository
      .createQueryBuilder('jh')
      .where('jh.employee_id = :employee_id', { employee_id })
      .leftJoin(Job, 'j', 'j.job_id = jh.job_id')
      .select([
        'jh.start_date as start_date',
        'jh.end_date as end_date',
        'j.job_title as job_title',
        'j.min_salary as min_salary',
        'j.max_salary as max_salary',
      ])
      .getRawOne();

    if (!FindOneData) {
      throw new BadRequestException(
        '입력한 아이디의 사원이 존재하지 않습니다.',
      );
    }

    return FindOneData;
  }
}
