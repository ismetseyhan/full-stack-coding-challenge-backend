
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    hello(): string | Promise<string>;
    getSeaport(id: number): Seaport | Promise<Seaport>;
}

export interface Seaport {
    id: number;
    name: string;
    location: Location;
}

export interface Location {
    city: string;
    countryAlpha2: string;
}

type Nullable<T> = T | null;
