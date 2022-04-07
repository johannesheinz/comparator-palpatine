import { Component } from '@angular/core';
import { GitHubRepo } from './input/input.component';

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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  inputVisible = true;
  repositoryCache: string = '';
  repositoryDetails: GitHubDetail[] = [];

  randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  randomDate(): Date {
    return new Date(
      (2012 + this.randomInt(10)).toString()
      + '-'
      + (1 + this.randomInt(10)).toString()
      + '-'
      + (1 + this.randomInt(27)).toString()
    );
  }

  fetchGitHubDetails(repositories: GitHubRepo[]): void {
    this.repositoryDetails = repositories.map((repo: GitHubRepo) => new GitHubDetail(
      repo,
      'https://github.com/' + repo.owner + '/' + repo.project,
      this.randomDate(),
      this.randomDate(),
      'v' + this.randomInt(3) + '.'  + this.randomInt(15) + '.' + this.randomInt(999),
      this.randomInt(543),
      this.randomInt(345),
      this.randomInt(69),
      this.randomInt(332),
      this.randomInt(10),
      this.randomInt(212),
      this.randomInt(876),
      this.randomInt(123),
      ['MIT', 'Apache', 'BSD', 'GPLv2'][this.randomInt(4)]
    ));
  }
}
