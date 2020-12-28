# GitPets Project Proposal

## Goal

This project aims to be a habit building productivity app that uses the GitHub
API to measure commit frequency. Users who sign up can pick a pet to take care
of, and they take care of the pet by making commits and using different
languages. A user can display an SVG on their GitHub profile which reflects
their pet's current state.

[GitHub API](https://docs.github.com/en/free-pro-team@latest/rest)  

The interface is intended to be very simple, familiar, and mobile-friendly.
Target users include those who may want to retire an old
Google account, but would encounter difficulty due to needing to transfer
YouTube data to a new account manually.

## Data needs

Frontend needs are handled with JavaScript... TODO

Backend needs are handled with... TODO
The API used is the GitHub API

Login is handled with GitHub OAuth.

## Outline

User data that can be migrated at the user's choice only includes the
user's channel subscriptions, liked videos, and any user-created playlists
along with their content.

Unfortunately, the application can not handle saving or migrating the user's
own videos, comments, view history, watch later, added playlists, or other data
not otherwise mentioned.

Login is handled with BCrypt and JWT. Linking YouTube will be handled with the
YouTube Data API. All user data will be deleted automatically after two weeks
for compliance with Google developer policies.

Due to API usage quota, this means that despite importing user YouTube
data uses little quota cost, exporting that data will cost 50 out of the
default 10,000 quota for each resource exported, which means only roughly 190 items
can be migrated per day.

This limitation is of little concern at the moment since this is an
educational/experimental app running off Heroku, however if it appears to be a
success I will consider more appropriate hosting and can make a request to
YouTube for a quota increase accordingly.

The user can save their data to a file, although the exporting of data will
only use the imported data on the server side, rather than exporting from a
user-provided file.

## User Flow

![User Flow]()

## Database Schema

![Database schema](./readme/GitPets_Schema.png)
