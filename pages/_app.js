import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://wp.eiendomsrettadvokater.no/graphql',
    cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ApolloProvider>
    )
}

export default MyApp
