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
import { Region } from './Region.entity';
import { Location } from './Locations.entity';

@Entity({ schema: 'hr', name: 'countries' })
export class Country {
  @PrimaryColumn()
  country_id: string;

  @Column({ length: 40 })
  country_name: string;

  @Column()
  region_id: number;

  // Relation with Region
  @ManyToOne(() => Region, (region) => region.countries)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  // Relation with Location
  @OneToMany(() => Location, (location) => location.country)
  locations: Location[];
}
