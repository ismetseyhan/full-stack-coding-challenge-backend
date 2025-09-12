import { Injectable } from '@nestjs/common';

// MOCK DATA
const locations = [
  { portId: 1, city: 'Hamburg', countryAlpha2: 'DE' },
  // { portId: 2, city: 'Rotterdam', country: 'Netherlands' },
];

const seaports = [
  { id: 1, name: 'Hamburg' },
  { id: 2, name: 'Rotterdam' },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Tilla!';
  }

  findSeaportById(id: number) {
    return seaports.find((port) => port.id === id);
  }

  findLocationForPort(portId: number) {
    console.log(`SERVICE: Checking for location of port ${portId}...`);
    return locations.find((loc) => loc.portId === portId);
  }
}
