import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Airport, AirportSearchResult } from '../graphql';

@Injectable()
export class AirportService {
  constructor(private readonly prisma: PrismaService) {
    console.log('AirportService started with Prisma Service');
  }

  async searchAirports(args: {
    search?: string;
    skip?: number;
    take?: number;
  }): Promise<AirportSearchResult> {
    const search = (args.search ?? '').trim();
    const skip = Math.max(0, args.skip ?? 0);
    const take = Math.max(1, args.take ?? 100);

    const where: Prisma.AirportWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { iata: { contains: search, mode: 'insensitive' } },
            { city: { contains: search, mode: 'insensitive' } },
            { country: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // total for pagination
    const total = await this.prisma.airport.count({ where });

    // page data
    const airportsDb = await this.prisma.airport.findMany({
      where,
      orderBy: { id: 'asc' },
      skip,
      take,
    });

    // map DB entities to your GraphQL type if needed; here they match 1:1
    const airports: Airport[] = airportsDb.map((a) => ({
      id: a.id,
      iata: a.iata,
      name: a.name ?? null,
      city: a.city ?? null,
      country: a.country ?? null,
      latitude: a.latitude ?? null,
      longitude: a.longitude ?? null,
    }));

    const currentPage = Math.floor(skip / take) + 1;
    const totalPages = total === 0 ? 0 : Math.ceil(total / take);
    const hasNextPage = skip + take < total;
    const hasPreviousPage = skip > 0;

    return {
      airports: airports,
      total: total,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      pageSize: take,
    };
  }
}
