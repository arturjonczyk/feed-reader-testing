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
    /* This suite is all about the RSS
    *  feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures
        * it has a URL defined and that the URL is not empty.
        */
        it('has url defined, and is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeTruthy();
            });
        });

        /* Loops through each feed in the allFeeds object
        * and ensures it has a name defined and that the name is not empty.
        */
         it('has name defined, and is not empty', function () {
             allFeeds.forEach(function (feed) {
                 expect(feed.name).toBeTruthy();
             });
         });
    });

    /* Checking the menu */
    describe('The menu', function () {

        var $body = $('body'),
            $menuButton = $('.menu-icon-link');

        /* when we loading the app is the menu hidden by default. */
        it('is hidden by default', function () {
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* Will the menu changes visibility when the menu icon is clicked?
        * Does the menu display when clicked and does it hide when clicked again?
        */
        it('display/hide when clicked', function () {
            $menuButton.trigger('click');
            expect($body.hasClass('menu-hidden')).toBeFalsy();
            $menuButton.trigger('click');
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Checking the "Initial Entries" */
    describe('Initial Entries', function () {

        /* When the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */

         beforeEach(function (done) {
             loadFeed(0, done);
         });

        it('should load at least a single .entry element', function () {
            var numOfEntries = $('.feed .entry').length;
            expect(numOfEntries).toBeGreaterThan(0);
        });

    });
    /* When the new feed is loaded. */
    describe('New Feed Selection', function () {
        /* When a new feed is loaded by the loadFeed function that the
         * content actually changes.
         */
        var content1, content2;

        beforeEach(function (done) {
            //  first load
            loadFeed(1, function () {
                // saving the content
                content1 = $('.feed').html();
                done();
            });
        });

        it('is loading deferent content when clicked diferent feed', function (done) {
            //  second load
            loadFeed(2, function () {
                // saving the changed content
                content2 = $('.feed').html();
                // comparing two content
                expect(content1).not.toEqual(content2);
                done();
            });
        });
    });
}());
