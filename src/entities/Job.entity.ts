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
import { Employee } from './employee.entity';
import { JobHistory } from './job_history.entity';

@Entity({ schema: 'hr', name: 'jobs' })
export class Job {
  @PrimaryColumn({ length: 10 })
  job_id: string;

  @Column({ length: 35 })
  job_title: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 0,
    unsigned: true,
    nullable: true,
  })
  min_salary: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 0,
    unsigned: true,
    nullable: true,
  })
  max_salary: number;

  // Relation with Employee
  @OneToMany(() => Employee, (employee) => employee.job)
  employees: Employee[];

  // Relation with JobHistory
  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.job)
  jobHistories: JobHistory[];
}
