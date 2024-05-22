describe('Panning X axis', () => {
    beforeEach(() => {
        // ensure the page is loaded before each test
        cy.visit('http://localhost:8000/page.html');
    });


    it('Testing: returning the mapcentrex and mapcentrey', () => {
        let mapCentreXvalue;
        let mapCentreYvalue;

        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            mapCentreXvalue = getMapCentreX();
            cy.log('Map Centre X value:   ', mapCentreXvalue);
        });

        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            mapCentreYvalue = getMapCentreY();
            cy.log('Map Centre X value:   ', mapCentreYvalue);
        });
    });

    it('Testing: panning on the X-axis, left once', () => {
        // after the map has been rendered onto the screen you are able to pan once
        let initialMapCentreX;
        let nextMapCentreX;

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
        });

        cy.wait(1000); 
        // mouse drag event in the X-direction on the canvas
        cy.get('#mcanvas')
            .trigger('mousedown', { clientX: 100, clientY: 0 })
            .trigger('mousemove', { clientX: 150, clientY: 0 }) // dragging to the left
            .trigger('mouseup');

        // wating for the panning to complete
        cy.wait(1000);

        // getting the final mapCentreX value after panning
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            nextMapCentreX = getMapCentreX();

            // asserting that the final mapCentreX value has changed
            expect(nextMapCentreX).to.be.greaterThan(initialMapCentreX);
        });
    });

    it('Testing: panning on the X-axis, right once', () => {
        // after the map has been rendered onto the screen you are able to pan once
        let initialMapCentreX;
        let nextMapCentreX;

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
        });

        cy.wait(1000); 
        // mouse drag event in the X-direction on the canvas
        cy.get('#mcanvas')
            .trigger('mousedown', { clientX: 100, clientY: 0 })
            .trigger('mousemove', { clientX: -100, clientY: 0 }) // dragging to the right
            .trigger('mouseup');

        // wating for the panning to complete
        cy.wait(1000); 

        // getting the final mapCentreX value after panning
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            nextMapCentreX = getMapCentreX();

            // asserting that the final mapCentreX value has changed (greater than 0)
            expect(nextMapCentreX).to.be.greaterThan(initialMapCentreX);
        });
    });

    // The next two tests show multiple pans in on the inital map.
    // Execting to see loged error saying that the maximum panning has been reached
    it('Testing: initial panning on the X-axis multiple times, right', () => {
        let previousMapCentreX;
        let initialMapCentreX;

        let numPanX = 3; // amount of times X pans
    
        // get the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
            previousMapCentreX = initialMapCentreX; // assign initial value to previousMapCentreX
        });
    
        // repeat panning multiple times
        for (let i = 0; i < numPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 100, clientY: 0 }) 
                .trigger('mousemove', { clientX: 300, clientY: 0 }) // dragging to the left from coordinates(100,100 to 300,100 )
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the X axis")
                }else{
                    // asserting that the final mapCentreX value has changed from the previous value
                    expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
    });

    it('Testing: initial panning on the X-axis multiple times, left', () => {
        let previousMapCentreX;
        let initialMapCentreX;

        let numPanX = 5; // amount of times X pans 

        // since the rendered map shows the entire map to zoom in and pan whilst staying within the borders of the canvas I need to zoom in multiple times.
        let numZoomIn = 15;

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
            previousMapCentreX = initialMapCentreX; // assign initial value to previousMapCentreX
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
        // repeat panning multiple times
        for (let i = 0; i < numPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 0 }) 
                .trigger('mousemove', { clientX: 50, clientY: 0 }) // panning left
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the X axis")
                }else{
                    if(previousMapCentreX===0){
                        expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                    }else{
                    // asserting that the final mapCentreX value has changed from the previous value
                    expect(updatedMapCentreX).to.be.lessThan(previousMapCentreX);
                    }
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
    });


    /*
    when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
    to counter this we can zoom in then I can test panning.
    */
    it('Testing: panning left on the X-axis multiple times', () => {
        let previousMapCentreX;
        let initialMapCentreX;

        let numPanX = 5; // amount of times X pans 

        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 8;

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
            previousMapCentreX = initialMapCentreX; // assign initial value to previousMapCentreX
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
        // repeat panning multiple times
        for (let i = 0; i < numPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 0 }) 
                .trigger('mousemove', { clientX: 50, clientY: 0 })  // panning left
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the X axis")
                }else{
                    if(previousMapCentreX===0){
                        expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                    }else{
                    // asserting that the final mapCentreX value has changed from the previous value
                    expect(updatedMapCentreX).to.be.lessThan(previousMapCentreX);
                    }
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
    });

    it('Testing: panning right on the X-axis multiple times, right', () => {
        let previousMapCentreX;
        let initialMapCentreX;

        let numPanX = 5; // amount of times X pans 

        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 15;

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
            previousMapCentreX = initialMapCentreX; // assign initial value to previousMapCentreX
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
        // repeat panning multiple times
        for (let i = 0; i < numPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 50 }) 
                .trigger('mousemove', { clientX: -50, clientY: 50 }) // panning right
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the X axis")
                }else{
                    expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
    });

    it('Testing: panning right and left on the X-axis', () => {
        let previousMapCentreX;
        let initialMapCentreX;

        let rightPanX = 5; // amount of times X pans right
        let leftPanX =5;    // amount of times X pans left
        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 15;

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
            previousMapCentreX = initialMapCentreX; // assign initial value to previousMapCentreX
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }

        // panning left multiple times
        for (let i = 0; i < leftPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 0 }) 
                .trigger('mousemove', { clientX: 50, clientY: 0 }) // panning right
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the left X axis")
                }else{
                    if(previousMapCentreX===0){
                        expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                    }else{
                    // asserting that the final mapCentreX value has changed from the previous value
                    expect(updatedMapCentreX).to.be.lessThan(previousMapCentreX);
                    }
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
         // repeat panning multiple times
         for (let i = 0; i < rightPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 0 }) 
                .trigger('mousemove', { clientX: -50, clientY: 0 }) // panning right
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the right X axis")
                }else{
                    expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
    });

});

describe('Panning Y axis', () => {
    beforeEach(() => {
        // ensure the page is loaded before each test
        cy.visit('http://localhost:8000/page.html');
    });

    it('Testing: panning on the Y-axis, down once', () => {
        // after the map has been rendered onto the screen you are able to pan once
        let initialMapCentreY;
        let nextMapCentreY;
    
        // getting the initial mapCentreY value
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            initialMapCentreY = getMapCentreY();
        });
    
        cy.wait(1000); 
        // mouse drag event in the Y-direction on the canvas
        cy.get('#mcanvas')
            .trigger('mousedown', { clientX: 0, clientY: 100 })
            .trigger('mousemove', { clientX: 0, clientY: 50 }) // panning down
            .trigger('mouseup');
    
        // wating for the panning to complete
        cy.wait(1000);
    
        // getting the final mapCentreY value after panning
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            nextMapCentreY = getMapCentreY();
            // asserting that the final mapCentreY value has changed
            expect(nextMapCentreY).to.be.greaterThan(initialMapCentreY);
        });
    });

    it('Testing: panning on the Y-axis, up once', () => {
        // after the map has been rendered onto the screen you are able to pan once
        let initialMapCentreY;
        let nextMapCentreY;
    
        // getting the initial mapCentreY value
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            initialMapCentreY = getMapCentreY();
        });
    
        cy.wait(1000); 
        // mouse drag event in the Y-direction on the canvas
        cy.get('#mcanvas')
            .trigger('mousedown', { clientX: 0, clientY: 100 })
            .trigger('mousemove', { clientX: 0, clientY: 150 })  //panning up
            .trigger('mouseup');
    
        // wating for the panning to complete
        cy.wait(1000); 
    
        // getting the final mapCentreY value after panning
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            nextMapCentreY = getMapCentreY();
            // asserting that the final mapCentreY value has changed (greater than 0)
            expect(nextMapCentreY).to.be.greaterThan(initialMapCentreY);
        });
    });

    // The next two tests show multiple pans in on the inital map.
    // Execting to see loged error saying that the maximum panning has been reached

    it('Testing: initial panning up on the Y-axis multiple times', () => {
        let previousMapCentreY;
        let initialMapCentreY;
    
        let numPanY = 3; // amount of times Y pans
    
        // get the initial mapCentreY value
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            initialMapCentreY = getMapCentreY();
            previousMapCentreY = initialMapCentreY; // assign initial value to previousMapCentreY
        });
    
        // repeat panning multiple times
        for (let i = 0; i < numPanY; i++) {
            // mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 100, clientY: 100 }) 
                .trigger('mousemove', { clientX: 100, clientY: 150 }) // panning up
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
    
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning up on the Y axis")
                } else {
                    // testing it has changed (greater than 0) as there after the first iteration we will reach the maximum pan
                    expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);             
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    });
    it('Testing: initial panning down on the Y-axis multiple times', () => {
        let previousMapCentreY;
        let initialMapCentreY;
    
        let numPanY = 3; // amount of times Y pans
    
        // get the initial mapCentreY value
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            initialMapCentreY = getMapCentreY();
            previousMapCentreY = initialMapCentreY; // assign initial value to previousMapCentreY
        });
    
        // repeat panning multiple times
        for (let i = 0; i < numPanY; i++) {
            // simulate a mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 100 }) 
                .trigger('mousemove', { clientX: 0, clientY: 50 }) // panning down
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
    
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY) {
                    cy.log("Maximum panning bottom of the Y axis")
                } else {
                    if (previousMapCentreY === 0) {
                        expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                    } else {
                        // asserting that the final mapCentreY value has changed from the previous value
                        expect(updatedMapCentreY).to.be.lessThan(previousMapCentreY);
                    }
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    });
    /*
    when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
    to counter this we can zoom in then I can test panning.
    */
    it('Testing: panning up on the Y-axis multiple times', () => {
        let previousMapCentreY;
        let initialMapCentreY;
    
        let numPanY = 5; // amount of times Y pans 
    
        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 8;
    
        // getting the initial mapCentreY value
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            initialMapCentreY = getMapCentreY();
            previousMapCentreY = initialMapCentreY; // assigning initial map centre Y value to previousMapCentreY
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
    
        // repeat panning multiple times
        for (let i = 0; i < numPanY; i++) {
            // mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 100 }) 
                .trigger('mousemove', { clientX: 0, clientY: 150 })  // panning up
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
    
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning up on the Y axis")
                } else {
                    if (previousMapCentreY === 0) {
                        expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                    } else {
                        // asserting that the final mapCentreY value has changed from the previous value
                        expect(updatedMapCentreY).to.be.lessThan(previousMapCentreY);
                    }
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    });

    it('Testing: panning down on the Y-axis multiple times', () => {
        let previousMapCentreY;
        let initialMapCentreY;
    
        let numPanY = 6; // amount of times Y pans 
    
        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 8;
    
        // getting the initial mapCentreY value
        cy.window().its('getMapCentreY').then((getMapCentreY) => {
            initialMapCentreY = getMapCentreY();
            previousMapCentreY = initialMapCentreY; // assign initial value to previousMapCentreY
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
    
        // repeat panning multiple times
        for (let i = 0; i < numPanY; i++) {
            // simulate a mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 100 }) 
                .trigger('mousemove', { clientX: 0, clientY: 50 })  // panning down
                .trigger('mouseup');
        
            // wait for the panning to complete 
            cy.wait(1000); 
        
            // get the final mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
    
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning down on the Y axis")
                } else {
                    expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    });

    it('Testing: panning up and down on the Y-axis', () => {
        let previousMapCentreY;
        let initialMapCentreY;
    
        let upPanY = 5; // amount of times X pans up
        let downPanY = 6;    // amount of times X pans down
        
        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 8;
    
        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreY = getMapCentreX();
            previousMapCentreY = initialMapCentreY; // assign initial value to previousMapCentreX
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
    
        // panning upwards
        for (let i = 0; i < upPanY; i++) {
            // simulate a mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 100 }) 
                .trigger('mousemove', { clientX: 0, clientY: 150 })  // panning up
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
    
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning up on the Y axis")
                } else {
                    if (previousMapCentreY === 0) {
                        expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                    } else {
                        // asserting that the final mapCentreY value has changed from the previous value
                        expect(updatedMapCentreY).to.be.lessThan(previousMapCentreY);
                    }
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    
        // panning down
        for (let i = 0; i < downPanY; i++) {
            // simulate a mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 150 }) 
                .trigger('mousemove', { clientX: 0, clientY: 100 })  // panning down
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
        
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning down on the Y axis")
                } else {
                    expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    });


});


describe('Panning X and Y axis', () => {
    beforeEach(() => {
        // ensure the page is loaded before each test
        cy.visit('http://localhost:8000/page.html');
    });
 
    it('Testing: panning (up, down, left and right) ', () => {
        let previousMapCentreY;
        let initialMapCentreY;
        let previousMapCentreX;
        let initialMapCentreX;
    
        let upPanY = 5; // amount of times X pans up 
        let downPanY = 6;    // amount of times X pans down

        let rightPanX = 5; // amount of times X pans right
        let leftPanX =5;    // amount of times X pans left
        
        // since the rendered map shows the entire map, to pan whilst staying within the borders of the canvas I need to zoom in multiple times
        let numZoomIn = 8;
    
        // getting the initial mapCentreY value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreY = getMapCentreX();
            previousMapCentreY = initialMapCentreY; // assign initial value to previousMapCentreY
        });

        // getting the initial mapCentreX value
        cy.window().its('getMapCentreX').then((getMapCentreX) => {
            initialMapCentreX = getMapCentreX();
            previousMapCentreX = initialMapCentreX; // assign initial value to previousMapCentreX
        });
    
        for (let i = 0; i < numZoomIn; i++) {
            cy.get('#mcanvas').trigger('wheel', { deltaY: -5000 }); // zooming
            cy.wait(1000); // waiting for zomming to be done
        }
        
         // panning left
         for (let i = 0; i < leftPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 0 }) 
                .trigger('mousemove', { clientX: 50, clientY: 0 }) // panning right
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the left X axis")
                }else{
                    if(previousMapCentreX===0){
                        expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                    }else{
                    // asserting that the final mapCentreX value has changed from the previous value
                    expect(updatedMapCentreX).to.be.lessThan(previousMapCentreX);
                    }
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }
         // panning right
         for (let i = 0; i < rightPanX; i++) {
            // simulate a mouse drag event in the X-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 30, clientY: 0 }) 
                .trigger('mousemove', { clientX: -50, clientY: 0 }) // panning right
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreX value after panning
            cy.window().its('getMapCentreX').then((getMapCentreX) => {
                const updatedMapCentreX = getMapCentreX();

                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreX === previousMapCentreX){
                    cy.log("Maximum panning on the right X axis")
                }else{
                    expect(updatedMapCentreX).to.be.greaterThan(previousMapCentreX);
                }
                // updating previousMapCentreX for the next iteration
                previousMapCentreX = updatedMapCentreX;
            });
        }

        // panning upwards
        for (let i = 0; i < upPanY; i++) {
            // simulate a mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 100 }) 
                .trigger('mousemove', { clientX: 0, clientY: 150 })  // panning up
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
    
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning up on the Y axis")
                } else {
                    if (previousMapCentreY === 0) {
                        expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                    } else {
                        // asserting that the final mapCentreY value has changed from the previous value
                        expect(updatedMapCentreY).to.be.lessThan(previousMapCentreY);
                    }
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    
        // panning down
        for (let i = 0; i < downPanY; i++) {
            // simulate a mouse drag event in the Y-direction on the canvas
            cy.get('#mcanvas')
                .trigger('mousedown', { clientX: 0, clientY: 150 }) 
                .trigger('mousemove', { clientX: 0, clientY: 100 })  // panning down
                .trigger('mouseup');
        
            // wait for the panning to complete
            cy.wait(1000); 
        
            // get the final mapCentreY value after panning
            cy.window().its('getMapCentreY').then((getMapCentreY) => {
                const updatedMapCentreY = getMapCentreY();
        
                // when the initial map is loaded it's limited in panning so after one pan you have reached the maximum pan.
                if (updatedMapCentreY === previousMapCentreY){
                    cy.log("Maximum panning down on the Y axis")
                } else {
                    expect(updatedMapCentreY).to.be.greaterThan(previousMapCentreY);
                }
                // updating previousMapCentreY for the next iteration
                previousMapCentreY = updatedMapCentreY;
            });
        }
    });
});