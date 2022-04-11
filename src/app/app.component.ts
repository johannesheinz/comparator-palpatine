import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { GitHubDetail, GitHubRepo } from './table/repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  inputVisible = true;
  repositoryCache: string = '';
  repositoryDetails: GitHubDetail[] = [];

  constructor(
    readonly location: PlatformLocation,
  ) {}

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
