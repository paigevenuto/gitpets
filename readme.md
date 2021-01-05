# GitPets Project Proposal

## Goal

This project aims to be a habit building productivity app that uses the GitHub
API to measure commit frequency. Users who sign up can pick a pet to take care
of, and they take care of the pet by making commits and using different
languages. A user can display an SVG on their GitHub profile which reflects
their pet's current state.

## Outline

**Frontend**: Vanilla JavaScript, but this may potentially change.

**Backend**: Node, Express, Axios

**Testing**: Jest and Supertest.

**API**: [GitHub API](https://docs.github.com/en/free-pro-team@latest/rest)  

**Login**: GitHub OAuth.

## Data needs

Only the last 7 days of data is requested each time.

### Data Accessed

- contributionsCollection: _A contributions collection aggregates contributions
such as opened issues and commits created by a user._
  - totalCommitContributions: _To measure frequency of public contributions._
  - restrictedContributionsCount: _To measure frequency of public contributions._
  - commitContributionsByRepository: _This aggregates commits made by a user
  within one repository._
    - LanguageConnection: _To measure the variety of languages used in recent contributions._

## User Flow

![User Flow](./readme/GitPets_User_Flow.jpg)

## Database Schema

![Database schema](./readme/GitPets_Schema.jpg)
