# GitPets Project Proposal

## Goal

This project aims to be a habit building productivity app that uses the GitHub
API to measure commit frequency. Users who sign up can pick a pet to take care
of, and they take care of the pet by making commits and using different
languages. A user can display an SVG on their GitHub profile which reflects
their pet's current state.

## Outline

**Frontend**: Vanilla JavaScript

**Backend**: Node, Express, Node-Postgres

**Testing**: Jest and Supertest.

**APIs**:

- [GitHub API](https://docs.github.com/en/free-pro-team@latest/rest)
- [OAuth Octokit Client](https://github.com/octokit/auth-oauth-app.js)
- [Octokit API Client](https://octokit.github.io/rest.js/v18)

**Login**: GitHub OAuth.

## Data needs

Only the last 7 days of data is requested each time.

### Data Accessed

- contributionsCollection: _A contributions collection aggregates contributions
such as opened issues and commits created by a user._
  - contributionsCalendar: *This is to measure frequency of contributions.*
  - commitContributionsByRepository: _This aggregates commits made by a user
  within one repository._
    - LanguageConnection: _To measure the variety of languages used in recent contributions._

## Pet Care

- Frequent contributions will keep your pet from getting hungry.
- Contributions that vary in type and language will keep your pet from getting bored.
- Making sure your pet gets lots of hearts keeps them from getting sad.

Each pet species has different needs. Some species are harder or easier to take
care of than others.

## User Flow

![User Flow](./readme/GitPets_User_Flow.jpg)

## Database Schema

![Database schema](./readme/GitPets_Schema.jpg)
