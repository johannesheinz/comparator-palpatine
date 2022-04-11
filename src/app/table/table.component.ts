import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Icon } from '../icon/icon.model';
import { AVAILABLE_COLUMNS, Column, Sorted } from './column.model';
import { GitHubDetail } from './repository.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent implements OnInit {

  @Input() repositories: GitHubDetail[] = [];

  readonly tableColumns = AVAILABLE_COLUMNS;

  constructor(
    private githubService: GithubService,
  ) {}

  ngOnInit(): void {
    this.githubService.load();
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  getIconFromSorting(sorting: Sorted): Icon | null {
    switch (sorting) {
      case Sorted.ASCENDING:
        return Icon.ARROW_DOWN;
      case Sorted.DESCENDING:
        return Icon.ARROW_UP;
      case Sorted.UNSORTED:
        return Icon.UNSORTED;
      default:
        return null;
    }
  }

  sortColumn(column: Column): void {
    // Set new desired sorting direction for current column
    switch(column.initialSortDirection) {
      case Sorted.UNSORTED:
        column.initialSortDirection = column.firstSortDirection;
        break;
      case Sorted.ASCENDING:
        column.initialSortDirection = Sorted.DESCENDING;
        break;
      case Sorted.DESCENDING:
        column.initialSortDirection = Sorted.ASCENDING;
        break;
      default:
        column.initialSortDirection = Sorted.UNSORTED;
        break;
    }

    // Reset all other columns
    this.tableColumns
      .filter((c: Column) => !column.equals(c))
      .forEach((c: Column) => c.initialSortDirection = Sorted.UNSORTED);

    // Perform the actual sort
    this.repositories.sort((a: GitHubDetail, b: GitHubDetail) => {
      return (column.initialSortDirection === Sorted.DESCENDING ? -1 : 1) * a.compare(b, column.id)
    });
  }
}
