import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Employee } from './Employee.entity';
import { JobHistory } from './job_history.entity';
import { Location } from './Locations.entity';

@Entity({ schema: 'hr', name: 'departments' })
export class Department {
  @PrimaryColumn()
  department_id: number;

  @Column({ length: 30 })
  department_name: string;

  @Column({ nullable: true })
  manager_id: number;

  @Column()
  location_id: number;

  // Relation with Location
  @ManyToOne(() => Location, (location) => location.departments)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  // Relation with Employee
  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  // Relation with JobHistory
  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.department)
  jobHistories: JobHistory[];
}
