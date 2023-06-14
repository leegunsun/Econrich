// seeds.ts

import { createConnection } from 'typeorm';
import { Country } from './src/entities/Countrie.entity';
import { Region } from './src/entities/region.entity';

async function seed() {
  const connection = await createConnection();

  const regionRepository = connection.getRepository(Region);
  const countryRepository = connection.getRepository(Country);

  // Regions data
  const regionsData = [
    { region_id: 1, region_name: 'Europe' },
    { region_id: 2, region_name: 'Americas' },
    { region_id: 3, region_name: 'Asia' },
    { region_id: 4, region_name: 'Middle East and Africa' },
  ];

  // Countries data
  const countriesData = [
    { country_id: 'IT', country_name: 'Italy', region_id: 1 },
    { country_id: 'JP', country_name: 'Japan', region_id: 3 },
    // ...and so on
  ];

  await regionRepository.save(regionsData);
  await countryRepository.save(countriesData);

  // Close the connection when seeding is done.
  await connection.close();
}

seed();
