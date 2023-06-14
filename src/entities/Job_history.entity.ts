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
import { Job } from './Job.entity';
import { Department } from './Department.entity';

@Entity({ schema: 'hr', name: 'job_history' })
export class JobHistory {
  @PrimaryColumn()
  employee_id: number;

  @PrimaryColumn({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ length: 10 })
  job_id: string;

  @Column()
  department_id: number;

  // Relation with Employee
  @ManyToOne(() => Employee, (employee) => employee.jobHistories)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  // Relation with Job
  @ManyToOne(() => Job, (job) => job.jobHistories)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  // Relation with Department
  @ManyToOne(() => Department, (department) => department.jobHistories)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
