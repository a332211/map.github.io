// Cypress test file
describe('Zooming', () => {
  beforeEach(() => {
      // ensure the page is loaded before each test
      cy.visit('http://localhost:8000/page.html');
  });
  
  it('Testing: inital zoom', () => {
      cy.get('#mcanvas').should('be.visible');

      // initial scale value
      let initialScale;

      cy.window().its('getScale').then((getScale) => {
          // getting the initial scale value
          initialScale = getScale();
          
          // log the initial scale value
          cy.log('Initial Scale:   ', initialScale);
      });

      cy.wait(1000); // waiting for action to complete
      // perform zoom operations
      cy.get('#mcanvas').trigger('wheel', { deltaY: -1000 }); 
      cy.wait(1000);

      // verifying that the scale value changes after zoom operations
      cy.window().its('getScale').then((getScale) => {
          // getting the updated scale value
          const updatedScale = getScale();
          
          // printing the updated scale value
          cy.log('Updated Scale:   ', updatedScale);

          // asserting that the updated scale is different from the initial scale
          expect(updatedScale).to.be.greaterThan(initialScale);
        });
  });

  it('Testing: zooming in multiple times', () => {
    cy.get('#mcanvas').should('be.visible');

    let initialScale; // initial scale (1)
    let previousScale; // scale of the previous zoom

    // getting the initial scale value
    cy.window().its('getScale').then((getScale) => {
      initialScale = getScale();
      previousScale = initialScale;
      cy.log('Initial Scale:   ', initialScale);
    });

    // performing zoom operations multiple times
    for (let i = 0; i < 5; i++) {
      cy.get('#mcanvas').trigger('wheel', { deltaY: -2000 }); // zooming
      cy.wait(1000); // waiting for zomming to be done

      // getting the updated scale value
      cy.window().its('getScale').then((getScale) => {
        const updatedScale = getScale();
        cy.log('Updated Scale:   ', updatedScale);

        // assert that the updated scale is greater than the previous scale
        expect(updatedScale).to.be.greaterThan(previousScale);

        // updating previousScale for the next iteration
        previousScale = updatedScale;
      });
    }
  });

  /*
  when testing zooming out I need to first zoom in because the inital rendered map is the maximum zoom out value there is so zooming out
  isn't possible. To test the zoom out I initially zoom in then zoom out.
  */

  it('Testing: initial zoom out', () => {
    // the map is designed so the initial rendered map is the maximum the user can zoom out, so I'm testing that here
    cy.get('#mcanvas').should('be.visible');

    let initialScale;
    let maxZoomOut=1477.2953072611913; // defining the maximum zoom out

    // getting the initial scale value
    cy.window().its('getScale').then((getScale) => {
      initialScale = getScale();
      cy.log('Initial Scale:', initialScale);
    });

    // performing a single zoom-out action
    cy.get('#mcanvas').trigger('wheel', { deltaY: 100 }); 

    // waiting for the zoom-out action to complete
    cy.wait(1000);

    // verifying that the scale value changes after the zoom-out operation
    cy.window().its('getScale').then((getScale) => {
      // getting the updated scale value
      const updatedScale = getScale();

      // log the updated scale value
      cy.log('Updated Scale:   ', updatedScale);

      // asserting that the updated scale equals the maximum zoom out value
      if (updatedScale === maxZoomOut) {
        cy.log('Maximum zoom out');
      } else {
        // intentially failing and logging an error if the scale is not the maximum zoom out value
        expect(updatedScale).to.equal(maxZoomOut);
        cy.log('error: scale is not the maximum zoom out value! ');
      }
    });
  });

  
it('Testing: zoom out multiple times after zooming in', () => {
  /* test handles multiple zoom-outs after zoom-ins, 
  however the test will fail if there are more zoom-outs than zoom-ins as there is nothing to handle the maximum zoomout of the map*/
  cy.get('#mcanvas').should('be.visible');
  
  let initialScale;
  let previousScale;
  
  // variables to determine how many times you want to zoom in or out
  let zoomIn=4;
  let zoomOut=3;
  
  // getting the initial scale value
  cy.window().its('getScale').then((getScale) => {
  initialScale = getScale();
  previousScale = initialScale;
  cy.log('Initial Scale:', initialScale);
  });

  for (let i = 0; i < zoomIn; i++) {
      cy.get('#mcanvas').trigger('wheel', { deltaY: -1000 }); // zooming in
      cy.wait(1000); // waiting for zomming in to be done
      // getting the updated scale value
      cy.window().its('getScale').then((getScale) => {
          const updatedScale = getScale();
          cy.log('Updated Scale:   ', updatedScale);

          // assert that the updated scale is greater than the previous scale
          expect(updatedScale).to.be.greaterThan(previousScale);

          // updating previousScale for the next iteration
          previousScale = updatedScale;
      });
  }
  // performing zooming out operations multiple times
  for (let i = 0; i < zoomOut; i++) {
      cy.get('#mcanvas').trigger('wheel', { deltaY: 1000 }); // zoom out with a lower value than the zoom in 
      cy.wait(1000); // waiting for the zoom out to complete

      // getting the updated scale value
      cy.window().its('getScale').then((getScale) => {
          const updatedScale = getScale();
          cy.log('Updated Scale:', updatedScale); 
          // asserting that the updated scale is less than previous zoom out
          expect(updatedScale).to.be.lessThan(previousScale);

          // updating previousScale for the next iteration
          previousScale = updatedScale;
      });
  }});

  it('Testing: zoom out multiple times after zooming in that handles maximum zooming out', () => {
    // same as previous test but handles maximum zoomout
    cy.get('#mcanvas').should('be.visible');

    let initialScale;
    let previousScale;

    // variables to determine how many times you want to zoom in or out
    let zoomIn=4;
    let zoomOut=6;

    // the maximum zoomout value (initial render size of the map)
    let maxZoomOut=1477.2953072611913;

    // getting the initial scale value
    cy.window().its('getScale').then((getScale) => {
        initialScale = getScale();
        previousScale = initialScale;
        cy.log('Initial Scale:', initialScale);
    });


    for (let i = 0; i < zoomIn; i++) {
        cy.get('#mcanvas').trigger('wheel', { deltaY: -1000 }); // zooming in
        cy.wait(1000); // waiting for zomming in to be done

        // getting the updated scale value
        cy.window().its('getScale').then((getScale) => {
        const updatedScale = getScale();
        cy.log('Updated Scale:   ', updatedScale);

        // assert that the updated scale is greater than the previous scale
        expect(updatedScale).to.be.greaterThan(previousScale);

        // updating previousScale for the next iteration
        previousScale = updatedScale;
        });
    }
    // performing zooming out operations multiple times
    for (let i = 0; i < zoomOut; i++) {
        cy.get('#mcanvas').trigger('wheel', { deltaY: 1000 }); // zoom out 
        cy.wait(1000); // waiting for the zoom out to complete

        // getting the updated scale value
        cy.window().its('getScale').then((getScale) => {
        const updatedScale = getScale();
        cy.log('Updated Scale:', updatedScale);

        // asserting that the updated scale does not exceed the maximum zoom-out value
        if (updatedScale === maxZoomOut) {
            cy.log('Maximum zoom out reached');
        } else {
            // asserting that the updated scale is greater than the minimum zoom value (1)
            expect(updatedScale).to.be.lessThan(previousScale);
            expect(updatedScale).to.not.equal(maxZoomOut);
        }

        // updating previousScale for the next iteration
        previousScale = updatedScale;
        });
    }
    });

});
