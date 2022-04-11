import { Icon } from "../icon/icon.model";

export enum Sorted {
  UNSORTED,
  ASCENDING,
  DESCENDING
}

export enum ColumnId {
  REPO = 1,
  LAST_COMMIT = 2,
  LAST_RELEASE = 3,
  STARS = 4,
  COMMITS = 5,
  LICENSE = 6,
  CONTRIBUTORS = 7,
  BRANCHES = 8,
  TAGS = 9,
  ISSUES = 10,
  PULL_REQUESTS = 11,
  FORKS = 12
}

export class Column {
  constructor(
    readonly id: number,
    readonly name_short: string,
    readonly name_long: string,
    readonly icon: Icon | null = null,
    readonly firstSortDirection: Sorted = Sorted.ASCENDING,
    public initialSortDirection: Sorted = Sorted.UNSORTED
  ) {}

  equals(other?: Column): boolean {
    return !!other && other.id === this.id;
  }
}

export const AVAILABLE_COLUMNS: Column[] = [
  new Column(ColumnId.REPO, "Repository", "GitHub Repository"),
  new Column(ColumnId.LAST_COMMIT, "Last commit", "Date of the latest commit", Icon.DATE, Sorted.DESCENDING),
  new Column(ColumnId.LAST_RELEASE, "Last release", "Date and Tag of the latest release", Icon.DATE, Sorted.DESCENDING),
  new Column(ColumnId.STARS, "Stars", "Number of stars", Icon.STAR, Sorted.DESCENDING),
  new Column(ColumnId.COMMITS, "Commits", "Number of commits", Icon.COMMIT, Sorted.DESCENDING),
  new Column(ColumnId.LICENSE, "License", "What License?", Icon.LEGAL),
  new Column(ColumnId.CONTRIBUTORS, "Contributors", "Number of contributors", Icon.OCTOCAT, Sorted.DESCENDING),
  new Column(ColumnId.BRANCHES, "Branches", "Number of branches", Icon.BRANCH, Sorted.DESCENDING),
  new Column(ColumnId.TAGS, "Tags", "Number of tags", Icon.TAG, Sorted.DESCENDING),
  new Column(ColumnId.ISSUES, "Issues", "Number of issues", Icon.ISSUE, Sorted.DESCENDING),
  new Column(ColumnId.PULL_REQUESTS, "PRs", "Number of pull requests", Icon.PULL_REQUESTS, Sorted.DESCENDING),
  new Column(ColumnId.FORKS, "Forks", "Numnber of forks", Icon.FORK, Sorted.DESCENDING)
];
