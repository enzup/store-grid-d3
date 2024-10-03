import { createAction, props } from '@ngrx/store';

export const loadRepositories = createAction(
  '[Repository] Load Repositories',
  props<{ username: string }>()
);

export const loadRepositoriesSuccess = createAction(
  '[Repository] Load Repositories Success',
  props<{ repositories: any[] }>()
);

export const loadRepositoriesFailure = createAction(
  '[Repository] Load Repositories Failure',
  props<{ error: any }>()
);
