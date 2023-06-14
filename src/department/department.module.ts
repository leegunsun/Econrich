import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/Department.entity';
import { Location } from '../entities/Locations.entity';
import { Country } from '../entities/Countrie.entity';
import { Region } from '../entities/Region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Location, Country, Region])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
