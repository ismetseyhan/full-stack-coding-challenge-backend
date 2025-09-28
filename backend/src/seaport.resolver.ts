import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver('Seaport')
export class SeaportResolver {
  constructor(private readonly appService: AppService) {}

  @Query()
  getSeaport(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.appService.findSeaportById(id) ?? null;
  }

  @ResolveField()
  location(@Parent() seaport: { id: number }) {
    return this.appService.findLocationForPort(seaport.id) ?? null;
  }
}
