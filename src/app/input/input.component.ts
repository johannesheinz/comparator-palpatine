import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParserService } from '../parser.service';
import { GitHubRepo } from '../table/repository.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {

  @Input() inputText: string = '';

  @Output() inputChanged = new EventEmitter<GitHubRepo[]>();
  @Output() rawInputChanged = new EventEmitter<string>();
  @Output() hideInput = new EventEmitter<void>();

  constructor(
    private parserService: ParserService,
  ) { }

  reset(): void {
    this.inputText='';
    this.rawInputChanged.emit('');
    this.inputChanged.emit([])
  }

  handleNewInput(textareaInput: string): void {
    this.rawInputChanged.emit(textareaInput);

    let githubUrls: GitHubRepo[] = this.parserService.parseGitHubUrls(textareaInput) ?? [];

    // Remove duplicates
    githubUrls = githubUrls.filter(
      (repo: GitHubRepo, index: number, thisArray: GitHubRepo[]) => index === thisArray.findIndex(
        (anotherRepo: GitHubRepo) => (
          repo.owner.trim().toLowerCase() === anotherRepo.owner.trim().toLowerCase()
          && repo.project.trim().toLowerCase() === anotherRepo.project.trim().toLowerCase()
        )
      )
    );
    this.inputChanged.emit(githubUrls);
  }
}
