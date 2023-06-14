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
import { Job } from './job.entity';
import { Department } from './Department.entity';
import { JobHistory } from './job_history.entity';

@Entity({ schema: 'hr', name: 'employees' })
export class Employee {
  @PrimaryColumn()
  employee_id: number;

  @Column({ length: 20, nullable: true })
  first_name: string;

  @Column({ length: 25 })
  last_name: string;

  @Column({ length: 25 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'date' })
  hire_date: Date;

  @Column({ length: 10 })
  job_id: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  salary: number;

  @Column({ type: 'decimal', precision: 2, scale: 2, nullable: true })
  commission_pct: number;

  @Column({ nullable: true })
  manager_id: number;

  @Column()
  department_id: number;

  // Relation with Job
  @ManyToOne(() => Job, (job) => job.employees)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  // Relation with Department
  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  // Relation with JobHistory
  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.employee)
  jobHistories: JobHistory[];
}
