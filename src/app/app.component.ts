import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRepositories } from './state/actions/repository.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  destroyed$: Subject<void> = new Subject<void>();
  public rowData: any[] = [];
  username = '';
  userNotFoundError;

  constructor(private store: Store<{ repositories: any[] }>) {
    this.store
      .select('repositories')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        if (data.error) {
          this.userNotFoundError = true;
        } else {
          this.userNotFoundError = false;
          this.rowData = data.repositories?.map((repo) => {
            return {
              name: repo.name,
              stars: repo.stargazers.totalCount,
            };
          });
        }
      });
  }

  fetchRepositories() {
    this.store.dispatch(loadRepositories({ username: this.username }));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
