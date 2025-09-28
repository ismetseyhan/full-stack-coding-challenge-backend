import { gql } from '@apollo/client';

export const SEARCH_AIRPORTS = gql`
  query SearchAirports($search: String, $skip: Int, $take: Int) {
    searchAirports(search: $search, skip: $skip, take: $take) {
      airports {
        id
        iata
        name
        city
        country
        latitude
        longitude
      }
      total
      currentPage
      totalPages
      hasNextPage
      hasPreviousPage
      pageSize
    }
  }
`;

export const GET_AIRPORT_BY_IATA = gql`
  query GetAirportByIata($iata: String!) {
    findAirportByIata(iata: $iata) {
      id
      iata
      name
      city
      country
      latitude
      longitude
    }
  }
`;