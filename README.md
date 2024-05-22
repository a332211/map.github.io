                                                        OVERVIEW

cypress folder contains the end to end testing of the web map.

node_module folder contains the dependencies and libraries used for this project.

test folder contains a copy of the OSM data to be tested in mocha.

unitTesting folder contains tests for projection and vector drawing.

babel file is the configuration of the babel library which is responsible for browser bundling, allowing the OSM data to be used on a browser.

cypress.config.js file is the default cypress configuration file.

hg1.pbf file is the OSM data used in the project.

main.js is the main file responsible for logic of the program: parsing, drawing and displaying the road names are done here.

package-lock.json and package.json files contain the packages for the installed libraries.

page.html file is the HTML file of the web map.

projection.js is the file responsible for the projection.

style.css file styles and places the displayed road name onto the screen.

sw_cache.js file responsible for installing, activating and fetching the service workers.




Javascript and Python is needed to run the files. They are run under a python local host accessed with this command in your terminal:
                                `python -m http.server` 



To run unitTesting you need to run in the terminal:
                                `jest testing/PLACEHOLDER.test.js  `
                    
PLACEHOLDER is a placeholder value for what ever unit test you want to run so to run the vector drawing test for example its:
                                `jest testing/vectordrawing.test.js `


To run the test/osmdata.js file you simple run in your terminal:
                               ` npm test`

To run the cypress tests this is the command needed in the terminal:
                               ` npx cypress open`

offline.js file supports and registers the service workers. 