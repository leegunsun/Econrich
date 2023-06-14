import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class EmployeeFindOnePipe implements PipeTransform {
  transform(value: any) {
    if (!this.isValid(value)) {
      throw new BadRequestException(
        '입력 과정에서 알 수 없는 오류가 발생했습니다.',
      );
    }

    return value;
  }

  private isValid(value: any) {
    const { employee_id } = value;

    if (employee_id == null) {
      throw new BadRequestException('employee_id는 비어있을 수 없습니다.');
    }

    if (typeof employee_id !== 'number') {
      throw new BadRequestException(
        'employee_id 타입이 올바르지 않습니다. number 타입이어야 합니다.',
      );
    }

    return true;
  }
}
