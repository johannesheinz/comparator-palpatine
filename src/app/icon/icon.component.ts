import { Component, Input } from '@angular/core';
import { Icon } from './icon.model';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass'],
})
export class IconComponent {

  @Input() icon: Icon | null = null;
  @Input() color = '#000';
  @Input() width = 16;

  // Needed for view access
  readonly Icon = Icon;

  hasViewbox16(): boolean {
    return this.icon !== null && this.icon !== undefined && (
      this.icon === Icon.BRANCH ||
      this.icon === Icon.COMMIT ||
      this.icon === Icon.FORK ||
      this.icon === Icon.ISSUE ||
      this.icon === Icon.LEGAL ||
      this.icon === Icon.OCTOCAT ||
      this.icon === Icon.PULL_REQUESTS ||
      this.icon === Icon.STAR ||
      this.icon === Icon.TAG)
  }

  hasViewbox24(): boolean {
    return this.icon !== null && this.icon !== undefined && (
      this.icon === Icon.ARROW_DOWN ||
      this.icon === Icon.ARROW_UP ||
      this.icon === Icon.DATE ||
      this.icon === Icon.UNSORTED)
  }
}
