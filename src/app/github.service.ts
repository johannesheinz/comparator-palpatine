import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql }  from 'apollo-angular';

const GET_POSTS = gql`
  query GetRepositories($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      createdAt
      description
      forkCount
      stargazerCount
      pushedAt
      updatedAt
      url
      isArchived
      isDisabled
      isEmpty
      isLocked
      lockReason
      latestRelease {
        name
        description
        createdAt
        updatedAt
        publishedAt
        isDraft
        isLatest
        isPrerelease
        url
        tagName
        tagCommit {
          oid
          message
        }
      }
      licenseInfo {
        description
        key
        name
        nickname
        url
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  loading: boolean = false;
  posts: any | null = null;

  private querySubscription: Subscription = new Subscription();

  constructor(private apollo: Apollo) {}

  load() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POSTS,
      variables: {
        owner: 'golobby',
        name: 'config',
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(loading);
        console.log(data);

        this.loading = loading;
        this.posts = data.posts;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
