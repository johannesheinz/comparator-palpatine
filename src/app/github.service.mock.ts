import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { GitHubDetail, GitHubRepo } from './table/repository.model';

const LICENSES = ['MIT', 'Apache', 'BSD', 'GPLv2'];

@Injectable({
  providedIn: 'root'
})
export class GithubServiceMock {

  private randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private randomDate(): Date {
    return new Date(
      (2012 + this.randomInt(10)).toString()
      + '-'
      + (1 + this.randomInt(10)).toString()
      + '-'
      + (1 + this.randomInt(27)).toString()
    );
  }

  private randomLicense(): string {
    return LICENSES[this.randomInt(LICENSES.length)];
  }

  fetchDetails(repositories: GitHubRepo[]): Observable<GitHubDetail[]> {
    const details = repositories.map(
      (repo: GitHubRepo) => new GitHubDetail(
        repo,
        `https://github.com/${repo.owner}/${repo.project}`,
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
        this.randomLicense(),
        this.randomInt(5) === 1
      )
    );

    // Remove first and last element
    if (details.length > 2) {
      details.pop();
      details.shift();
    }

    // Shuffle array
    details.sort(() => Math.random() - 0.5)

    // Remove first and last element
    if (details.length > 2) {
      // Remove first and last element
      details.pop();
      details.shift();
    }

    // Return observable with 2.5s delay
    return of(details)
      .pipe(
        delay(2500)
      );
  }
}
