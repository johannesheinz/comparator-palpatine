import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';
import { GITHUB_PERSONAL_ACCESS_TOKEN_1, GITHUB_PERSONAL_ACCESS_TOKEN_2 } from './config';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_PERSONAL_ACCESS_TOKEN_PREFIX = 'ghp_';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    // Read token from local storage: localStorage.getItem('token');
    const ghpat_decoded_1: string = atob(GITHUB_PERSONAL_ACCESS_TOKEN_1);
    const ghpat_decoded_2: string = atob(GITHUB_PERSONAL_ACCESS_TOKEN_2);

    return {
      headers: {
        Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN_PREFIX}${ghpat_decoded_1}${ghpat_decoded_2}`
      }
    };
  });

  return {
    link: ApolloLink.from([basic, auth, httpLink.create({ uri: GITHUB_GRAPHQL_API })]),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
