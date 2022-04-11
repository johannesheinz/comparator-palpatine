import { Injectable, OnDestroy } from '@angular/core';
import { pipe, map, Subscription, Observable } from 'rxjs';
import { Apollo, gql }  from 'apollo-angular';
import { GitHubDetail, GitHubRepo } from './table/repository.model';

const SEARCH_MULTIPLE_REPOS = gql`
  query SearchRepositories($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 99) {
      nodes {
        ... on Repository {
          name
          owner {
            login
          }
          nameWithOwner
          description
          stargazerCount
          forkCount
          updatedAt
          issues(states: [OPEN]) {
            totalCount
          }
          pullRequests(states: [OPEN]) {
            totalCount
          }
          isArchived
          latestRelease {
            name
            tagName
            publishedAt
          }
          mentionableUsers {
            totalCount
          }
          licenseInfo {
            name
            nickname
          }
          branches: refs(refPrefix: "refs/heads/", first: 100) {
            totalCount
          }
          tags: refs(refPrefix: "refs/tags/", last: 100) {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first:1) {
                  totalCount
                  nodes {
                    ... on Commit{
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const QUERY_SINGLE_REPO = gql`
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

  constructor(private apollo: Apollo) {}

  fetchDetails(repositories: GitHubRepo[]): Observable<GitHubDetail[]> {
    const queryString = this.buildSerachQuery(repositories);

    return this.apollo
      .watchQuery<any>({
        query: SEARCH_MULTIPLE_REPOS,
        variables: { queryString }
      })
      .valueChanges
      .pipe(
        map(({ data }) => {
          const searchResults = data?.search?.nodes ?? [];
          return searchResults.map((json: any) => this.mapResultToGitHubDetail(json))
        })
      );
  }

  private buildSerachQuery(repositories: GitHubRepo[]): string {
    return repositories
      .map((repo: GitHubRepo) => `repo:${repo.owner}/${repo.project}`)
      .join(' ');
  }

  private mapResultToGitHubDetail(json: any): GitHubDetail {
    const repo = json?.nameWithOwner.split('/');
    return new GitHubDetail(
      {
        owner: repo[0] ?? '',
        project: repo[1] ?? '',
      },
      `https://github.com/${repo[0]}/${repo[1]}`,
      json?.defaultBranchRef?.target?.history?.nodes[0]?.committedDate ? new Date(json?.defaultBranchRef?.target?.history?.nodes[0]?.committedDate) : null,
      json?.latestRelease?.publishedAt ? new Date(json?.latestRelease?.publishedAt) : null,
      json?.latestRelease?.tagName ?? '',
      json?.defaultBranchRef?.target?.history?.totalCount ?? 0,
      json?.forkCount ?? 0,
      json?.tags?.totalCount ?? 0,
      json?.stargazerCount ?? 0,
      json?.branches?.totalCount ?? 0,
      json?.issues?.totalCount ?? 0,
      json?.pullRequests?.totalCount ?? 0,
      json?.mentionableUsers?.totalCount ?? 0, // there ist no way to get contributors via GraphQL v4 API
      json?.licenseInfo?.nickname ?? json?.licenseInfo?.name ?? '',
      json.isArchived
    );
  }
}
