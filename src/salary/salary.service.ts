import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entities/Employee.entity';
import { Department } from '../entities/Department.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateDepartmentSalaryDTO } from './dto/salary.dto';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  /**
   * 1. department_id에 해당하는 부서의 연봉을 올립니다.
   *             아래의 수식을 따릅니다.
   *  ele.salary += ele.salary * ele.commission_pct;
   *
   * @param UpdateDepartmentSalaryDTO
   * @returns
   */
  async salaryUpdate(
    UpdateDepartmentSalaryDTO: UpdateDepartmentSalaryDTO,
  ): Promise<object> {
    const { department_id }: UpdateDepartmentSalaryDTO =
      UpdateDepartmentSalaryDTO;

    // 해당 부서가 존재하는지 확인
    const FindOneData: Department = await this.departmentRepository.findOne({
      where: { department_id },
    });

    if (!FindOneData) {
      throw new BadRequestException(
        '입력한 아이디의 부서가 존재하지 않습니다.',
      );
    }

    // transaction
    try {
      this.entityManager.transaction(async (manager) => {
        const employee: Employee[] = await manager.find(Employee, {
          where: { department_id },
        });

        const updatedEmployees: Employee[] = employee.map((ele) => {
          ele.salary = ele.salary * 1;
          ele.commission_pct = ele.commission_pct * 1;
          ele.salary += ele.salary * ele.commission_pct;
          ele.salary = ele.salary / 1;
          return ele;
        });

        await manager.save(updatedEmployees);
      });

      return { msg: '정상적으로 반영 되었습니다.' };
    } catch (error) {
      throw new InternalServerErrorException('서버에 오류가 발생했습니다.');
    }
  }
}
