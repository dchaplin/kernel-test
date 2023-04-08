## Description

Final Space episode list React application & Nest.js API.

## Installation

The application is divided into a frontend and backend. Navigate to both `/api` and `/final-space` to install each one.

To install:

```bash
$ yarn install
```

## Running the app

Navigate to both `/api` and `/final-space` to run each app.

```bash
$ yarn start
```

Navigate to `http://127.0.0.1:5173/` to view the app.

## The thinking

### API

- I used Nest.js to get up and running quickly and because I have been using it recently.
- I tried to only have one endpoint 'episodes' (actually just the default root endpoint) which meant merging the relevant data from the Final Space API
- Instead of doing a call per character once the episode has been received from the final space API, I chose to get all episodes and all characters and then build a map of the characters indexed by ID.
- Then exposed only what was required by the frontend on the api. Namely episode id, name, air date, imageUrl and characterImageUrls.

### Final Space frontend

- Most of the work is in the App.tsx file. I focused on finishing rather than separating out into components.
- The only real big decision was the use of `react-paginate`. This saved some time and then I could focus on figuring out how to style it with styled components instead of the default class name approach.
- Might have tried to separate out the styled paginate and pagination code a bit. Perhaps a hook -> useEpisodePagination.

Lets me know if you have any questions. Thanks!
