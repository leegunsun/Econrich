import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/Department.entity';
import { Repository } from 'typeorm';
import { FindOneDepartmentDTO } from './dto/department.dto';
import { Location } from '../entities/Locations.entity';
import { Region } from 'src/entities/Region.entity';
import { Country } from 'src/entities/Countrie.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  /**
   * 1. 부서 아이디 입력하면 Location & Country & Region을 LeftJoin해서 return
   *
   * @param FindOneDepartmentDTO
   * @returns
   */
  async findDepartment(
    FindOneDepartmentDTO: FindOneDepartmentDTO,
  ): Promise<Department & Location & Country & Region> {
    const { department_id }: FindOneDepartmentDTO = FindOneDepartmentDTO;

    const FindOneData: Department & Location & Country & Region =
      await this.departmentRepository
        .createQueryBuilder('dp')
        .where('dp.department_id = :department_id', { department_id })
        .leftJoin(Location, 'l', 'dp.location_id = l.location_id')
        .leftJoin(Country, 'c', 'l.country_id = c.country_id')
        .leftJoin(Region, 'r', 'r.region_id = c.region_id')
        .groupBy('dp.department_id')
        .select([
          'dp.department_name as department_name',
          'l.street_address as street_address',
          'l.postal_code as postal_code',
          'l.city as city',
          'l.state_province as state_province',
          'r.region_name as region_name',
          'c.country_name as country_name',
        ])
        .getRawOne();

    if (!FindOneData) {
      throw new BadRequestException(
        '입력한 아이디의 부서가 존재하지 않습니다.',
      );
    }

    return FindOneData;
  }
}
