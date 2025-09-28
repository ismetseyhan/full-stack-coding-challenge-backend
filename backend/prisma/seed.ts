import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';

const prisma = new PrismaClient();

async function main() {
  try {
    const existingCount = await prisma.airport.count();
    if (existingCount > 0) {
      console.log(`Found ${existingCount}`);
      return;
    }
    const airportPath = path.join(__dirname, 'airports.json');
    if (!fs.existsSync(airportPath)) {
      throw Error(`Airport ${airportPath} does not exist`);
    }
    const airportsData = JSON.parse(fs.readFileSync(airportPath, 'utf8'));
    console.log(`Found ${airportsData.length} airports from Json`);

    const batchSize = 1000;
    let processed = 0;

    for (let i = 0; i < airportsData.length; i = i + batchSize) {
      const batch = airportsData.slice(i, i + batchSize);
      const airports = batch.map((airport) => ({
        name: airport.name,
        iata: airport.iata,
        city: airport.city,
        country: airport.country,
        latitude: airport.latitude,
        longitude: airport.longitude,
      }));

      await prisma.airport.createMany({
        data: airports,
        skipDuplicates: true,
      });
      processed += batch.length;
    }
    console.log(`Processed`);
    console.log(`Total: ${prisma.airport.count()}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
