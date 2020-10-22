import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import '../styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { FormContextProvider } from '../FormContext'

const client = new ApolloClient({
  uri: "https://eiendomsrettadvokater.no/graphql",
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <FormContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </FormContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
