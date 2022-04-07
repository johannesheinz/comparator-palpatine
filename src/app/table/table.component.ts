import { Component, Input, OnInit } from '@angular/core';
import { GitHubDetail } from '../app.component';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent implements OnInit {

  @Input() repositories: GitHubDetail[] = [];

  constructor(
    private githubService: GithubService,
  ) {}

  ngOnInit(): void {
    this.githubService.load();
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
