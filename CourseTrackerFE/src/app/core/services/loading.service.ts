import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = signal(0);
  public isLoading = computed(() => this.loadingCount() > 0);

  increaseLoadingCount() {
    this.loadingCount.update(count => count + 1);
  }

  decreaseLoadingCount() {
    this.loadingCount.update(count => count - 1);
  }

}
