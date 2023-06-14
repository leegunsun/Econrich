import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Country } from '../entities/Countrie.entity';
import { Department } from '../entities/Department.entity';
import { Employee } from '../entities/Employee.entity';
import { JobHistory } from '../entities/Job_history.entity';
import { Job } from '../entities/Job.entity';
import { Location } from '../entities/Locations.entity';
import { Region } from '../entities/Region.entity';

config();

const configService = new ConfigService();

const mysqlDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [Country, Employee, JobHistory, Job, Location, Department, Region],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default mysqlDataSource;
