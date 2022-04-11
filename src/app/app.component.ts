import { PlatformLocation } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { GithubService } from './github.service';
import { GithubServiceMock } from './github.service.mock';
import { GitHubDetail, GitHubRepo } from './table/repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {

  inputVisible = true;
  repositoryCache: string = '';
  repositoryDetails: GitHubDetail[] = [];
  repositoryDetailsMissing: GitHubRepo[] = [];
  repositoryDetailsLoading = false;

  private gihubSubscription = new Subscription();

  constructor(
    readonly location: PlatformLocation,
    private githubService: GithubService,
    private githubServiceMock: GithubServiceMock,
  ) {}

  fetchGitHubDetails(repositories: GitHubRepo[]): void {
    this.repositoryDetailsLoading = true;
    const service = environment.useRandomData ? this.githubServiceMock : this.githubService;

    this.gihubSubscription = service.fetchDetails(repositories).subscribe(
      (details: GitHubDetail[]) => {
        // Re-sort details into the same order as the input and find out which repos had no details
        const repoDetails: GitHubDetail[] = [];
        const missingRepos: GitHubRepo[] = [];

        repositories.forEach((repo: GitHubRepo) => {
          const matchingEntry = details.filter((detail: GitHubDetail) => detail.repo.owner === repo.owner && detail.repo.project === repo.project);
          if (matchingEntry && matchingEntry.length > 0) {
            if (matchingEntry.length > 1) {
              console.error(`There are ${matchingEntry.length} matching details for the repository ${repo.owner} / ${repo.project}`);
            }
            repoDetails.push(matchingEntry[0]);
          } else {
            missingRepos.push(repo);
          }
        });

        this.repositoryDetails = repoDetails;
        this.repositoryDetailsMissing = missingRepos;
        this.repositoryDetailsLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.gihubSubscription.unsubscribe();
  }
}
