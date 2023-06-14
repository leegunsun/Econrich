import { BadRequestException, PipeTransform } from '@nestjs/common';

export class DepartmentFindOnePipe implements PipeTransform {
  transform(value: any) {
    value.department_id = Number(value.department_id);

    if (!this.isValid(value)) {
      throw new BadRequestException(
        '입력 과정에서 알 수 없는 오류가 발생했습니다.',
      );
    }

    return value;
  }

  private isValid(value: any) {
    const { department_id } = value;

    if (department_id == null) {
      throw new BadRequestException('department_id는 비어있을 수 없습니다.');
    }

    if (typeof department_id !== 'number') {
      throw new BadRequestException(
        'department_id 타입이 올바르지 않습니다. number 타입이어야 합니다.',
      );
    }

    return true;
  }
}
