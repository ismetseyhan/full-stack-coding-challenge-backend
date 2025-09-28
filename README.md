# Backend Coding Challenge – Airport Lookup API

This project is a solution to the backend coding challenge provided by Tilla. The main goal was to optimize airport data handling, resolve a bug in the Seaports resolver, and create a searchable API endpoint to retrieve airport data efficiently from the backend.

## Tasks Completed

<img width="952" height="922" alt="image" src="https://github.com/user-attachments/assets/0c9fbe0b-177c-4d34-b85d-a987589f528d" />

<img width="852" height="874" alt="image" src="https://github.com/user-attachments/assets/c7fa54a4-a8c5-46de-a244-96766a9e7009" />



### 1. Fixed Seaport Resolver Bug
- In certain cases (e.g., querying specific IDs like 1, 2, 3), the `getSeaport` resolver would throw an error when the result was `null`.
- The resolver was updated to safely return `null` when no match is found.
- The `@ResolveField()` for `location` was also updated to guard against null parent objects.

### 2. Moved Airport Data to the Database
- Create postgresql db via remote server
- Created a new `Airport` model in the Prisma schema.
- Migrated ~6,000 airport records from a JSON file into the PostgreSQL database using a seed script.
- Added indexes on `iata`, `name`, `city`, and `country` for optimized search performance.
- Made `iata` a unique field.

### 3. Implemented Search API with Pagination
- Added a GraphQL `searchAirports` query that supports:
  - Full-text search on `iata`, `name`, `city`, or `country`.
  - Pagination via `skip` and `take` arguments.
  - Metadata such as `total`, `currentPage`, `totalPages`, `hasNextPage`, `hasPreviousPage`, and `pageSize`.

## Running the App

```bash
yarn install
yarn start
```

App will be available at: http://localhost:3001/graphql

## Example GraphQL Query

```graphql
query {
  searchAirports(search: "berlin", skip: 0, take: 5) {
    airports {
      id
      iata
      name
      city
      country
    }
    total
    currentPage
    totalPages
    hasNextPage
    hasPreviousPage
    pageSize
  }
}
```

## Commit Highlights

- **fix seaport**: Prevent null crashes by allowing nullable return values.
- **prisma**: Added Airport model and migration.
- **seed**: Imported JSON data into the database.
- **airports**: Implemented full-text search with pagination.
- **fe**: Created airport search UI and detail page.
- **fe**: Removed old files and cleaned up frontend logic.

## Deliverables

GitHub repo access granted to:
- @umartayyab
- @Calvin-Tilla
- @akshatamohanty
- @AleSua93

- Screen recording video https://youtu.be/EHLc2uFapGs


## Answers to Extra Questions

### What edge cases would you consider before going to production?

- Limit maximum `take` value to avoid heavy queries (e.g., `take <= 100`).
- Ensure search input is sanitized and validated.
- Handle cases where no results are found gracefully.
- Protect against DB connection issues and timeouts.
- Add proper error handling and status codes in case of system failure.

### How would you scale this to handle high traffic?

- Use caching (e.g., Redis) for frequently queried results.
- Introduce full-text search with tools like PostgreSQL `tsvector` or ElasticSearch.
- Set query timeouts and pagination limits.
- Enable connection pooling and horizontal scaling for the backend.
- Add API rate limiting and observability tools (e.g., Prometheus, Grafana).

### What helps you work well in a fully remote team?

- Clear, asynchronous communication (Slack, Notion, PR comments).
- Well-defined tasks and expectations.
- A culture of ownership, trust, and documentation.
- Frequent and constructive code reviews.
- Developer experience tools like CI pipelines, auto-formatting, and linting.
