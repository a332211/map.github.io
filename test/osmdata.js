const assert = require('assert');
const osmread = require('osm-read');

describe('OSM Data Testing for the OSM data', function() {
    
    it('should parse OSM data and handle callbacks when the expected outcome is reached', function(done) {
        this.timeout(10000); // setting timeout to 10 seconds
        const filePath = './hg1.pbf';
        osmread.parse({
            filePath,
            endDocument: function(){
                // this callback is called when the document parsing is complete.
                done();
            },
            error: function (msg) {
                // this callback is called on any parsing error.
                done(new Error(`Parsing error: ${msg}`));
            },
        });
    });

    it('Testing: if there are nodes in the OSM data', function(done) {
        this.timeout(10000); // setting timeout to 10 seconds
        const filePath = './hg1.pbf';
        let foundNode = false;
        osmread.parse({
            filePath,
            endDocument: function(){
                if (!foundNode) {
                    // error showing there were no nodes detected in OSM data
                    done(new Error("Nodes were not detected before the end of document parsing.")); 
                }
            },
            node: function(node){
                if (!foundNode) {
                    foundNode = true;
                    done(); // call done after detecting the first node
                }
            },        
            error: function (msg) {
                // this callback is called on any parsing error.
                done(new Error(`Parsing error: ${msg}`));
            },
        });
    });


    it('Testing: if there are ways in the OSM data', function(done) {
        this.timeout(10000); // setting timeout to 10 seconds
        const filePath = './hg1.pbf';
        let foundWay = false;
        osmread.parse({
            filePath,
            endDocument: function(){
                if (!foundWay) {
                    // error showing there were no ways detected in OSM data
                    done(new Error("Ways were not detected before the end of document parsing.")); 
                }
            },
            way: function(way){
                if (!foundWay) {
                    foundWay = true;
                    done(); // call done after detecting the first way
                }
            },        
            error: function (msg) {
                // this callback is called on any parsing error.
                done(new Error(`Parsing error: ${msg}`));
            },
        });
    });


    it('Testing: if there are relations in the OSM data', function(done) {
        this.timeout(10000); // setting timeout to 10 seconds
        const filePath = './hg1.pbf';
        let foundRelations = false;
        osmread.parse({
            filePath,
            endDocument: function(){
                if (!foundRelations) {
                    // error showing there were no relations detected in OSM data
                    done(new Error("Relations were not detected before the end of document parsing.")); 
                }
            },
            relation: function(relation){
                if (!foundRelations) {
                    foundRelations = true;
                    done(); // call done after detecting the first relation
                }
            },        
            error: function (msg) {
                // this callback is called on any parsing error.
                done(new Error(`Parsing error: ${msg}`));
            },
        });
    });


    it('Testing: verifying OSM element properties', function(done) {
        this.timeout(10000); // setting timeout to 10 seconds
        const filePath = './hg1.pbf';    
        let nodeCounter=0; // how many node there are in the OSM file
        let wayCounter = 0; // how many ways there are in the OSM file  
        let relationCounter = 0; // how many relations there are in the OSM file    

        osmread.parse({
            filePath,
            endDocument: function(){
                console.log(nodeCounter); 
                console.log(wayCounter); 
                console.log(relationCounter); 
                done(); // call done when the parsing is complete
            },
            node: function(node){
                // verifying properties of the nodes in the OSM data if not undefined
                if(node.id!=undefined)assert.strictEqual(typeof node.id, 'string'); 
                if(node.id!=undefined) assert.strictEqual(typeof node.lat, 'number');
                if(node.id!=undefined)assert.strictEqual(typeof node.lon, 'number'); 
                if(node.id!=undefined) assert.strictEqual(typeof node.tags, 'object'); 
                if(node.id!=undefined)assert.strictEqual(typeof node.version, 'number');
                if(node.id!=undefined)assert.strictEqual(typeof node.timestamp, 'number'); 
                if(node.id!=undefined)assert.strictEqual(typeof node.changeset, 'number');
                if(node.id!=undefined)assert.strictEqual(typeof node.uid, 'string'); 
                if(node.id!=undefined)assert.strictEqual(typeof node.user, 'string');        
                nodeCounter++;        
            },        
            way: function(way){
                // verifying properties of the ways in the OSM data if not undefined
                if(way.id!=undefined)assert.strictEqual(typeof way.id, 'string'); 
                if(way.tags!=undefined)assert.strictEqual(typeof way.tags, 'object');
                if(way.nodeRefs!=undefined)assert.strictEqual(Array.isArray(way.nodeRefs), true);
                if(way.version!=undefined)assert.strictEqual(typeof way.version, 'number');
                if(way.timestamp!=undefined)assert.strictEqual(typeof way.timestamp, 'number'); 
                if(way.changeset!=undefined)assert.strictEqual(typeof way.changeset, 'number');
                if(way.uid!=undefined)assert.strictEqual(typeof way.uid, 'string'); 
                if(way.user!=undefined)assert.strictEqual(typeof way.user, 'string');
                wayCounter++;
            },  
            relation: function(relation){
                // verifying properties of the relations in the OSM data if not undefined
                if(relation.id!=undefined)assert.strictEqual(typeof relation.id, 'string'); 
                if(relation.tags!=undefined)assert.strictEqual(typeof relation.tags, 'object');
                if(relation.members!=undefined)assert.strictEqual(Array.isArray(relation.members), true);
                if(relation.version!=undefined)assert.strictEqual(typeof relation.version, 'number');
                if(relation.timestamp!=undefined)assert.strictEqual(typeof relation.timestamp, 'number'); 
                if(relation.changeset!=undefined)assert.strictEqual(typeof relation.changeset, 'number');
                if(relation.uid!=undefined)assert.strictEqual(typeof relation.uid, 'string'); 
                if(relation.user!=undefined)assert.strictEqual(typeof relation.user, 'string');
                relationCounter++;
            },         
            error: function (msg) {
                // this callback is called on any parsing error.
                done(new Error(`Parsing error: ${msg}`));
            },
        });
    });

    
});
