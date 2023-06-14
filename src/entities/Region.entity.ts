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

@Entity({ schema: 'hr', name: 'regions' })
export class Region {
  @PrimaryColumn()
  region_id: number;

  @Column({ length: 25 })
  region_name: string;

  // Relation with Country
  @OneToMany(() => Country, (country) => country.region)
  countries: Country[];
}
