import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import Layout from "../../components/layout";
import { GET_AIRPORT_BY_IATA } from "../../graphql/queries";
import { Airport } from "../../types/airport";

const Page: NextPage = () => {
  const router = useRouter();
  const { iata } = router.query;

  const { loading, error, data } = useQuery(GET_AIRPORT_BY_IATA, {
    variables: { iata: iata as string },
    skip: !iata,
  });

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div>Error: {error.message}</div>
      </Layout>
    );
  if (!data?.findAirportByIata)
    return (
      <Layout>
        <div>Airport not found</div>
      </Layout>
    );

  const airport: Airport = data.findAirportByIata;

  return (
    <Layout>
      <h1 className="mb-4 text-2xl font-bold">Airport: {airport.name}</h1>
      <Link
        href="/"
        className="text-blue-400 hover:text-blue-600 hover:underline"
      >
        ← Back to overview
      </Link>
      <pre className="p-2 mt-6 text-sm text-gray-500 rounded bg-gray-50">
        {JSON.stringify(airport, undefined, 2)}
      </pre>
    </Layout>
  );
};

export default Page;
