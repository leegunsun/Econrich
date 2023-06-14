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
import { Country } from './Countrie.entity';
import { Department } from './Department.entity';

@Entity({ schema: 'hr', name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column({ length: 40, nullable: true })
  street_address: string;

  @Column({ length: 12, nullable: true })
  postal_code: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 25, nullable: true })
  state_province: string;

  @Column()
  country_id: string;

  // Relation with Country
  @ManyToOne(() => Country, (country) => country.locations)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  // Relation with Department
  @OneToMany(() => Department, (department) => department.location)
  departments: Department[];
}
