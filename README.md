# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## About the task (Fullstack test)

Write a purely front-end (react) JavaScript application to help you find movies!

## Technical requirements

- Outlined, readable, clean code (not 1 file), generated HTML code is structured, non-inline CSS
- English language (both UI and code)
- You can use external libraries (react, ramda, moment, jquery, apollo, lodash etc.), but not the libraries that specifically hide Wikipedia requests and their processing.
- Design should be secondary, minimal (layout, margins, title highlighting, etc.)

## Functional requirements

- Have a movie title search box on the UI, on enter/click of a button it requests the search results from our graphql sandbox for TMDB:  <https://tmdb.sandbox.zoosh.ie/dev/grphql>
- It displays the results and some of their data (name, category, score) in a list, titles can be clicked
- By clicking on an address, the app tries to find the related English wikipedia page (with a REST request) and then displays a summary of it in a detail panel (e.g. first paragraph), along with a clickable link that opens in a new window in IMDB and wikipedia
- Bonus: Dual state search engine; a “related” button next to the two links in the movie: this switches the movie list from search results to a list of related movies related to the selected movie

## Levels

1. A working web page
2. Spinner while loading data from TMDBW or wikipedia
3. Search for related movies
4. Bonus # 1: Use Material-UI library, Material-UI look
5. Bonus # 2: Tests

It can also be a little bigger bite, we leave it up to you how far you want to go with it and whether you also deal with bonus tasks. Obviously, a junior can solve less, while a senior more in a period of time, but what interests us the most is the quality of the code itself that is born in that time.
