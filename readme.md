# GitPets

[http://gitpets.herokuapp.com/](http://gitpets.herokuapp.com/)

## Summary

Choose a pet from different species.

Feed and care for it with GitHub contributions.

Show off your pet on your GitHub profile's readme as demonstrated.

<a href="https://gitpets.herokuapp.com/user/paigevenuto"><img
src="https://gitpets.herokuapp.com/pet/paigevenuto"></a>

```html
<a href="https://gitpets.herokuapp.com/user/paigevenuto"><img src="https://gitpets.herokuapp.com/pet/paigevenuto"></a>
```
## Pet Care

- Frequent contributions will keep your pet from getting hungry.
- Contributions that vary in type and language will keep your pet from getting bored.
- Making sure your pet gets lots of hearts keeps them from getting sad.

Each pet species has different needs. Some species are harder or easier to take
care of than others.

## Software Used

- Vanilla JavaScript (Frontend needs were simple)
- Node
- Express (Used for middleware and simplicity)
- Node-Postgres
- Superagent (Used for testing persistence)
- [GitHub API](https://docs.github.com/en/free-pro-team@latest/rest) (Used to
  fetch public data)
- [OAuth Octokit Client](https://github.com/octokit/auth-oauth-app.js) (Used
  for user login)

## Testing

User flow and offline functions are tested

Use `jest -i` to run test cases.

## User Flow

1. Visit [http://gitpets.herokuapp.com/](http://gitpets.herokuapp.com/)
2. Click 'Get started' to view pet choices
3. Choose a species and name your pet
4. Paste the code snippet displayed to share your pet in your user readme
5. Visitors can click the pet and give it one ❤

### Data Accessed

- contributionsCollection: _A contributions collection aggregates contributions
such as opened issues and commits created by a user._
  - contributionsCalendar: *This is to measure frequency of contributions.*
  - commitContributionsByRepository: _This aggregates commits made by a user
  within one repository._
    - LanguageConnection: _To measure the variety of languages used in recent contributions._
