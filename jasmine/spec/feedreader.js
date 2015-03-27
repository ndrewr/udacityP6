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


				/* TODO: Write a test that loops through each feed
					* in the allFeeds object and ensures it has a URL defined
					* and that the URL is not empty.
					*/
				it('should have each feed with a url', function() {
					var url_expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;


					allFeeds.forEach(function(feed) {
						expect(feed.url).toMatch(url_expr);
					});
				});


				/* TODO: Write a test that loops through each feed
					* in the allFeeds object and ensures it has a name defined
					* and that the name is not empty.
					*/
				it('has each feed with defined name', function() {
					var name_expr = /^[a-z0-9_-\s]{1,20}$/i;
					allFeeds.forEach(function(feed) {
						expect(feed.name).toMatch(name_expr);
					});
				});
		});


		/* TODO: Write a new test suite named "The menu" */
		describe('The Menu', function() {
				// cache jQuery results before testing specs
				var bod = $('body');
				var icon = $('.menu-icon-link');

				/* TODO: Write a test that ensures the menu element is
					* hidden by default. You'll have to analyze the HTML and
					* the CSS to determine how we're performing the
					* hiding/showing of the menu element.
					*/
				it('should be hidden by default', function() {
					// menu is hidden by toggling 'menu-hidden' class on body
					expect(bod.hasClass('menu-hidden')).toBe(true);
				});

					/* TODO: Write a test that ensures the menu changes
					* visibility when the menu icon is clicked. This test
					* should have two expectations: does the menu display when
					* clicked and does it hide when clicked again.
					*/
				it('will change visibility when icon is clicked', function() {
					// process: trigger then check
					icon.click();
					expect(bod.hasClass('menu-hidden')).not.toBe(true);
					icon.click();
					expect(bod.hasClass('menu-hidden')).toBe(true);
				});
		});

		/* TODO: Write a new test suite named "Initial Entries" */
		describe('Initial Entries', function() {
				var feedList = $('.feed-list a');
			$( document ).ajaxSuccess(function() {
				console.log('ajax done');
				done();
			});

				// prepare for async
				beforeEach(function(done) {
					var random_feed = Math.floor(Math.random() * feedList.length);

					// loadFeed has an optional 2nd param for callback
					loadFeed(random_feed, done);
				});

				/* TODO: Write a test that ensures when the loadFeed
					* function is called and completes its work, there is at least
					* a single .entry element within the .feed container.
					* Remember, loadFeed() is asynchronous so this test wil require
					* the use of Jasmine's beforeEach and asynchronous done() function.
					*/
				it('will have 1 or more entries after loadFeed completes', function(done) {
					var entries = $('.entry');
					expect(entries.length).toBeGreaterThan(0);
					done();
				});

		});

		/* TODO: Write a new test suite named "New Feed Selection"

				/* TODO: Write a test that ensures when a new feed is loaded
					* by the loadFeed function that the content actually changes.
					* Remember, loadFeed() is asynchronous.
					*/
}());
