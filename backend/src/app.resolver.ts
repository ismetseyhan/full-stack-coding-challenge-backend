import { Args, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AirportSearchResult } from './graphql';
import { AirportService } from './airport/airport_service';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly airportService: AirportService,
  ) {}

  @Query()
  hello(): string {
    return this.appService.getHello();
  }
  @Query('searchAirports')
  async searchAirports(
    @Args('search') search?: string,
    @Args('skip') skip?: number,
    @Args('take') take?: number,
  ): Promise<AirportSearchResult> {
    const safeSkip = skip ?? 0;
    const safeTake = take ?? 100;

    return this.airportService.searchAirports({
      search,
      skip: safeSkip,
      take: safeTake,
    });
  }
}
