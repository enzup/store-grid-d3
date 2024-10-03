import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RepositoryActions from '../actions/repository.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GitHubService } from '../../services/github.service';

@Injectable()
export class RepositoryEffects {
  
  loadRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoryActions.loadRepositories),
      mergeMap((action) =>
        this.githubService.getRepositories(action.username).pipe(
          map((data: any) =>
            RepositoryActions.loadRepositoriesSuccess({
              repositories: data.data.user.repositories.nodes,
            })
          ),
          catchError((error) =>
            of(RepositoryActions.loadRepositoriesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private githubService: GitHubService
  ) {
    this.actions$ = inject(Actions);
  }
}
