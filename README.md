# What is Soundloop?

Soundloop is a web application that allows students of any age to create music using computational thinking concepts. 

## **Available Scripts**

In the project directory, you can run:

### **`npm start`**

Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.You will also see any lint errors in the console.

### **`npm test`**

Launches the test runner in the interactive watch mode.See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### **`npm run build`**

Builds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### **`npm run eject`**

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Deployment

This github repository is linked to Netlify ([https://www.netlify.com/](https://www.netlify.com/)), causing continuous deployment of the app whenever pushes to the master branch are made. 

## Major Frameworks & API's

- React - a Javascript framework for creating UI. [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- Redux - manages the global state of the application, pushing the data needed across components to one overall JSON file called the store.  [https://redux.js.org/](https://redux.js.org/)
- Konva - an HTML5 Canvas JavaScript framework that extends the 2d context by enabling canvas interactivity for desktop and mobile applications. [https://konvajs.org/docs/index.html](https://konvajs.org/docs/index.html)
- ToneJS - a framework for creating interactive music in the browser. [https://tonejs.github.io/](https://tonejs.github.io/)

## Navigating the Project Directory

- **build** - the compiled static code that the browser reads for rendering Soundloop
- **node_modules** - the packages needed for running soundloop
- **public** - files that Webpack does not compile, and are sent directly to build
- **src** -  precompiled React files. This is where the majority of Soundloop lives.
    - *components* - The UI elements split into independent, reusable pieces, allowing each piece to be edited in isolation. The highest level component that renders everything else is ****App.js
    - *styles* - Global CSS
    - *actions* - Payloads of information sent to the store (our JSON database).
    - *middleware -* Loggers for examining the store's state.
    - *reducers -* files that specify how the application's state changes in response to actions sent to the store.
- **package.json** - a list of what packages and versions Soundloop requires

## How the app works

Each note is a circle that can be dragged onto a loop. During play, these notes will rotate around the loop and make sound upon striking the cord. 

There are two different modes to SoundLoop - linear and angular. 

### Linear Mode
In linear mode, each loop plays at a constant linear velocity. This means that the smaller the loop is, the faster the notes will complete a loop cycle. This mode is great for creating rhythmic harmonies and crafting interesting new compositions.

### Angular Mode
In angular mode, each loop plays at a constant angular velocity. If lining up notes across loops, they will all play at the same time and make a chord. This mode is best for recreating your favorite songs.
