import React from "react";
import Link from "next/link";
import SearchInput from "./search-input";
import Pagination from "./pagination";
import { useAirportSearch } from "../hooks/use-airport-search";

const AirportPage: React.FC = () => {
  const { data, loading, error, search, currentPage, setCurrentPage } =
    useAirportSearch(10);

  const handleSearch = (query: string) => {
    search(query);
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">
          Failed to load airports. Please check if the GraphQL server is running
          on port 3001.
        </p>
        <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Input */}
      <SearchInput
        onSearch={handleSearch}
        placeholder="Search airports by name, city, country, or IATA code..."
        minLength={3}
        debounceMs={300}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Searching airports...</p>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <>
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold mb-6">
              Airports{" "}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-black">
                {data.total}
              </span>
            </h2>
          </div>

          {/* Airport Grid */}
          {data.airports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.airports.map((airport) => (
                <Link
                  key={airport.iata}
                  href={`/airports/${airport.iata.toLowerCase()}`}
                  className="block p-5 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 hover:shadow-md focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none transition-all duration-200"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-medium text-gray-900">
                        {airport.name}, {airport.city}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500">
                      {airport.country}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No airports found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or search for a different
                location.
              </p>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              hasNextPage={currentPage < data.totalPages}
              hasPreviousPage={currentPage > 1}
              total={data.total}
              pageSize={data.pageSize}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AirportPage;
