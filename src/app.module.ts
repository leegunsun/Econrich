import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Country } from './entities/Countrie.entity';
import { Department } from './entities/Department.entity';
import { Employee } from './entities/Employee.entity';
import { JobHistory } from './entities/Job_history.entity';
import { Job } from './entities/Job.entity';
import { Location } from './entities/Locations.entity';
import { Region } from './entities/Region.entity';
import { SalaryModule } from './salary/salary.module';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentModule } from './department/department.module';
import { PubApiModule } from './pub-api/pub-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Country,
          Employee,
          JobHistory,
          Job,
          Location,
          Department,
          Region,
        ],
        synchronize: false, // !!! true 절대 금지 !!!
      }),
    }),
    SalaryModule,
    EmployeeModule,
    DepartmentModule,
    PubApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
