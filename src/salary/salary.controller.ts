import { Body, Controller, Post, Put, Get, Param, Query } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { UpdateDepartmentSalaryDTO } from './dto/salary.dto';
import { DepartmentUpdateSalaryPipe } from './pipe/salary.pipe';

@Controller('salary')
export class SalaryController {
  constructor(private salaryService: SalaryService) {}

  /**
   * 1. department_id에 해당하는 부서의 연봉을 올립니다.
   *             아래의 수식을 따릅니다.
   *  ele.salary += ele.salary * ele.commission_pct;
   *
   * @param UpdateDepartmentSalaryDTO
   * @returns
   */
  @Put('/department/update')
  async salaryUpdate(
    @Body(DepartmentUpdateSalaryPipe)
    UpdateDepartmentSalaryDTO: UpdateDepartmentSalaryDTO,
  ): Promise<object> {
    return await this.salaryService.salaryUpdate(UpdateDepartmentSalaryDTO);
  }
}
