import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  constructor(private apollo: Apollo) {}
  private token = 'enter you personal access token here';

  getRepositories(username: string) {
    return this.apollo.query({
      query: gql`
        query($login: String!) {
          user(login: $login) {
            repositories(first: 100) {
              nodes {
                name
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
      `,
      variables: {
        login: username,
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }
    });
  }
}
