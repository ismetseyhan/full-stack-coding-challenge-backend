import { NextPage } from "next";
import Layout from "../components/layout";
import AirportPage from "../components/airport-page";

const Page: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-8">Code Challenge: Airports</h1>
      <AirportPage />
    </Layout>
  );
};

export default Page;