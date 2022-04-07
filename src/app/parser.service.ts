import { Injectable } from '@angular/core';
import { GitHubRepo } from './input/input.component';

// Thanks to https://regex101.com/
const REGEX_GITHUB = /github.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)|([a-zA-Z0-9_-]+).github.io\/([a-zA-Z0-9_-]+)/gm;

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  matchToGitHubRepo(match: RegExpMatchArray): GitHubRepo {
    return {
      owner: match[1] ?? match[3] ?? '',
      project: match[2] ?? match[4] ?? '',
    };
  }

  parseGitHubUrls(text: string): GitHubRepo[] {
    const matches = Array.from(text.matchAll(REGEX_GITHUB), this.matchToGitHubRepo.bind(this));
    return matches ?? [];
  }
}
