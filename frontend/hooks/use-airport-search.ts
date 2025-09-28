import { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_AIRPORTS } from '../graphql/queries';
import { AirportSearchResult } from '../types/airport';

interface UseAirportSearchReturn {
  data: AirportSearchResult | null;
  loading: boolean;
  error: any;
  search: (query: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useAirportSearch = (pageSize: number = 10): UseAirportSearchReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');
  const [initialized, setInitialized] = useState(false);

  const [searchAirports, { data, loading, error }] = useLazyQuery(SEARCH_AIRPORTS);

  const search = useCallback((query: string) => {
    const trimmedQuery = query.trim();
    
    // If search query changes, reset to page 1
    if (trimmedQuery !== currentSearch) {
      setCurrentSearch(trimmedQuery);
      setCurrentPage(1);
      
      // Only search if query has at least 3 characters or is empty
      if (trimmedQuery.length >= 3 || trimmedQuery.length === 0) {
        const skip = 0; // Page 1
        searchAirports({
          variables: {
            search: trimmedQuery || undefined,
            skip,
            take: pageSize,
          },
        });
      }
    }
  }, [currentSearch, searchAirports, pageSize]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    const skip = (page - 1) * pageSize;
    
    searchAirports({
      variables: {
        search: currentSearch || undefined,
        skip,
        take: pageSize,
      },
    });
  }, [currentSearch, searchAirports, pageSize]);

  // Initial load - show all airports (only once)
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      searchAirports({
        variables: {
          search: undefined,
          skip: 0,
          take: pageSize,
        },
      });
    }
  }, [initialized, searchAirports, pageSize]);

  return {
    data: data?.searchAirports || null,
    loading,
    error,
    search,
    currentPage,
    setCurrentPage: handlePageChange,
  };
};