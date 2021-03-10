import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // uri: 'http://localhost:4000/'
    uri: 'http//10.0.2.2:4000/'  // en android
  })
});

export default client;
