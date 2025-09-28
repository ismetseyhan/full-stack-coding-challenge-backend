import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { SeaportResolver } from './seaport.resolver';
import { PrismaService } from './prisma/prisma.service';
import { AirportService } from './airport/airport_service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    AppResolver,
    SeaportResolver,
    PrismaService,
    AirportService,
  ],
})
export class AppModule {}
