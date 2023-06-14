import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/Department.entity';
import { Employee } from '../entities/Employee.entity';
import { DataSource } from 'typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department, Employee, DataSource]),
    HttpModule,
  ],
  controllers: [SalaryController],
  providers: [SalaryService],
})
export class SalaryModule {}
