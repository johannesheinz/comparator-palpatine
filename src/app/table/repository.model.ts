import { ColumnId } from "./column.model";

export type GitHubRepo = {
  owner: string;
  project: String;
};

export class GitHubDetail {
  constructor(
    readonly repo: GitHubRepo,
    readonly repository_url: string,
    readonly latest_commit_date: Date,
    readonly latest_release_date: Date,
    readonly latest_release_version: string,
    readonly count_commits: number,
    readonly count_forks: number,
    readonly count_tags: number,
    readonly count_stars: number,
    readonly count_branches: number,
    readonly count_issues: number,
    readonly count_pull_requests: number,
    readonly count_contributors: number,
    readonly license: string,
  ) { }

  private selected = false;

  toggleSelect(): void {
    this.selected = !this.selected;
  }

  isSelected(): boolean {
    return this.selected;
  }

  compare(other: GitHubDetail, columnId: ColumnId): number {
    if (!other) {
      return 1;
    } else {
      switch (columnId) {
        case ColumnId.REPO:
          return (this.repo.owner + this.repo.project).localeCompare(other.repo.owner + other.repo.project);
        case ColumnId.LAST_COMMIT:
          return this.latest_commit_date.valueOf() - other.latest_commit_date.valueOf();
        case ColumnId.LAST_RELEASE:
          return this.latest_release_date.valueOf() - other.latest_release_date.valueOf();
        case ColumnId.STARS:
          return this.count_stars - other.count_stars;
        case ColumnId.COMMITS:
          return this.count_commits - other.count_commits;
        case ColumnId.LICENSE:
          return this.license.localeCompare(other.license);
        case ColumnId.CONTRIBUTORS:
          return this.count_contributors - other.count_contributors;
        case ColumnId.BRANCHES:
          return this.count_branches - other.count_branches;
        case ColumnId.TAGS:
          return this.count_tags - other.count_tags;
        case ColumnId.ISSUES:
          return this.count_issues - other.count_issues;
        case ColumnId.PULL_REQUESTS:
          return this.count_pull_requests - other.count_pull_requests;
        case ColumnId.FORKS:
          return this.count_forks - other.count_forks;
      }
    }
    return 0;
  }
}
