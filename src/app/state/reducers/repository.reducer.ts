import { createReducer, on } from '@ngrx/store';
import * as RepositoryActions from '../actions/repository.actions';

export interface State {
  repositories: any[];
  error: string | null;
}

const initialState: State = {
  repositories: [],
  error: null,
};

export const repositoryReducer = createReducer(
  initialState,
  on(RepositoryActions.loadRepositoriesSuccess, (state, { repositories }) => ({
    ...state,
    repositories,
    error: null,
  })),
  on(RepositoryActions.loadRepositoriesFailure, (state, { error }) => ({
    ...state,
    repositories: [],
    error,
  }))
);
