import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../entities/Employee.entity';
import { JobHistory } from '../entities/Job_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, JobHistory])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
