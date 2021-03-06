/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('contains defined URL feeds that are not empty', function () {
            for (let feed of allFeeds) {
               expect(feed.url).toBeDefined();
               expect(feed.url).not.toBe("", "", null);
            }
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has defined name feeds that are not empty', function () {
            for (let feed of allFeeds) {
               expect(feed.name).toBeDefined();
               expect(feed.name).not.toBe("", "", null);
            }
        });
    });


    /*  a new test suite named "The menu" */

    describe('The menu', function () {
        let body = $('body'),
        callBack = jasmine.createSpy('body', 'toggleClass'),
        menuIconVisible = $('menu-icon-list:visible');
    

        /* a test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
            expect(callBack).not.toHaveBeenCalled();
         });
         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          */
        it('changes visibility when clicked' , function () {
        if (callBack.calls.count() % 2 === 0) {
            expect(body.hasClass('menu-hidden')).toBe(true);
        }else {
            expect(body.hasClass('menu-hidden')).toBe(false);
        }
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        beforeEach(function(done) {
            loadFeed(0);
            done();
        });

        /* a test that ensures when the loadFeed
         * function is called and completes its work
         */
        it (' contain at least one single entry element within feed container', function(done) {
            expect($('.feed')).not.toBeNull();
                expect($('.feed')).not.toBeNull();
                expect($('.entry')).toBeDefined();
                done();
            });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        //Store initial feed
        let feedOne;

        //Call loadFeed function asynchronously and store intial feed
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $('.feed').html();
                loadFeed(1, done);
            });
    });

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes content when new feed is loaded', function(done) {
            //Call loadFeed function with new index
            loadFeed(1, function() {
                //Test if new feed differs from intial feed
                expect($('.feed').html()).not.toEqual(feedOne);
                done();
            });
        });

        //Revert feed back to orginal feed
        afterEach(function(done) {
            loadFeed(0, done);
        });
    });
}());
