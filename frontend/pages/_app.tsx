import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/api-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
