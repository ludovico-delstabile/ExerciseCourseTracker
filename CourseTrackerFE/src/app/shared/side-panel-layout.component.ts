import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-side-panel-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
  styles: `
    :host {
      display: flex;
      height: 100%;
    }
    .content {
      flex: 1;
      padding-right: 8px;
    }
    .panel {
      flex-basis: 30%;
      padding-left: 8px;
    }
  `,
  template: `
    <div class="content">
      <ng-content select="[content]"></ng-content>
    </div>
    <div class="panel" *ngIf="isPanelOpen()">
      <ng-content select="[panel]"></ng-content>
    </div>
  `,
})
export class SidePanelLayoutComponent {
  isPanelOpen = input(false, { transform: booleanAttribute });
}
