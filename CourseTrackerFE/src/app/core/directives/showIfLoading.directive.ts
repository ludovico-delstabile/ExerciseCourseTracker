import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';

@Directive({
  selector: '[appShowIfLoading]',
  standalone: true,
})
export class ShowIfLoadingDirective {
  public loadingSrv = inject(LoadingService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    toObservable(this.loadingSrv.isLoading)
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(isLoading => isLoading ? this.addTemplate() : this.clearTemplate());
  }

  private addTemplate() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private clearTemplate() {
    this.viewContainer.clear();
  }
}
