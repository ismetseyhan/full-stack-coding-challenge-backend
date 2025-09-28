
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Airport {
    id: number;
    iata: string;
    name?: Nullable<string>;
    city?: Nullable<string>;
    country?: Nullable<string>;
    latitude?: Nullable<number>;
    longitude?: Nullable<number>;
}

export interface AirportSearchResult {
    airports: Airport[];
    total: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageSize: number;
}

export interface IQuery {
    searchAirports(search?: Nullable<string>, skip?: Nullable<number>, take?: Nullable<number>): AirportSearchResult | Promise<AirportSearchResult>;
    hello(): string | Promise<string>;
    getSeaport(id: number): Nullable<Seaport> | Promise<Nullable<Seaport>>;
}

export interface Seaport {
    id: number;
    name: string;
    location?: Nullable<Location>;
}

export interface Location {
    city: string;
    countryAlpha2: string;
}

type Nullable<T> = T | null;
