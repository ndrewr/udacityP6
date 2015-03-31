/* feedreader.js
	* This is the Jasmine spec file
	*/

/*  run after the DOM is ready */
$(function() {
		var feed_index = 0, // defaults to first feed at index 0
				feed_list = $('.feed-list a'),
				feed_entries = $('.feed');

		/* This suite tests RSS feeds definitions,
		 * from the allFeeds variable in our application.
		 */
		describe('RSS Feeds', function() {
				/* tests to make sure that the allFeeds variable has
				 * been defined and that it is not empty.
				 */
				it('are defined', function() {
						expect(allFeeds).toBeDefined();
						expect(allFeeds.length).not.toBe(0);
				});

				/* ensure each feed has a non-empty URL defined
				 */
				it('should have each feed with a url', function() {
					// re to test for url (see README notes for source)
					var url_expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

					allFeeds.forEach(function(feed) {
						expect(feed.url).toMatch(url_expr);
					});
				});

				/* ensure each feed has a non-empty name defined
				 */
				it('has each feed with defined name', function() {
					// re to test for acceptable name (see README)
					var name_expr = /^[a-z0-9_-\s]{1,20}$/i;
					allFeeds.forEach(function(feed) {
						expect(feed.name).toMatch(name_expr);
					});
				});
		});

		/* "The menu" tests functionality of toggle menu */
		describe('The Menu', function() {
				var bod = $('body'),
						icon = $('.menu-icon-link');

				/* ensure the menu element is hidden by default.
				 */
				it('should be hidden by default', function() {
					// hide menu by toggling 'menu-hidden' class on body
					expect(bod.hasClass('menu-hidden')).toBe(true);
				});

					/* ensure the menu changes visibility when the menu
					 * icon is clicked. Test both show and hide
					*/
				it('will change visibility when menu button is clicked', function() {
					// process: trigger then check
					icon.click();
					expect(bod.hasClass('menu-hidden')).not.toBe(true);
					icon.click();
					expect(bod.hasClass('menu-hidden')).toBe(true);
				});

				/* ensure the menu changes icon when btn is clicked
				 */
				it('will change icon when menu button is clicked', function() {
					var prev_icon = icon.find('i').attr('class');
					icon.click();
		expect(icon.find('i').attr('class')).not.toBe(prev_icon);
					icon.click();
				expect(icon.find('i').attr('class')).toBe(prev_icon);
				});
		});

		/* "Initial Entries" tests default content is loaded */
		describe('Initial Entries', function() {
				// prepare for async
				beforeEach(function(done) {
					// load a random feed from allFeeds
					feed_index = Math.floor(Math.random() * feed_list.length);
					// loadFeed has an optional 2nd param for callback
					loadFeed(feed_index, done);
				});

				/* ensure when the loadFeed function is called and
				 * completes its work, there is at least 1 entry
				 */
				it('will have 1 or more entries after loadFeed completes', function(done) {
					var entries = $('.entry');
					expect(entries.length).toBeGreaterThan(0);
					done();
				});
		});

		/* "New Feed Selection" tests new feeds load correctly
		 */
		describe('New Feed Selection', function() {
				// will cache prev content info for comparison
				var prev_title,
						prev_entry,
						prev_color;

				beforeAll(function(done) {
					// cache then call loadFeed on a subsequent feed
					prev_title = $('.header-title').text(),
					prev_entry = $('.entry').first().find('h2').text();
					prev_color = $('.header').css('backgroundColor');

					feed_index = (feed_index + 1 >= allFeeds.length)? 0 : feed_index + 1;
					loadFeed(feed_index, done);
				});

				/* ensure when a new feed is loaded by the loadFeed
				 * function that the content actually changes.
				 */
			it('should change feed content when a new feed is loaded', function() {
				// check that the feed title has changed
				expect($('.header-title').text()).not.toBe(prev_title);
				// check that first feed entry changed
				var new_entry = $('.entry').first().find('h2').text();
				expect(new_entry).not.toBe(prev_entry);
			});

			/* ensure header background color changes when a new
			 * feed is loaded
			 */
			it('should change header color when new feed is loaded', function() {	expect($('.header').css('backgroundColor')).not.toBe(prev_color);
			});
		});

		describe('Clip Menu', function() {
			var clip_menu = $('.right-menu'),
					clip_btn = $('.clip-btn');

			it('should be hidden by default', function() {
				expect(clip_menu.hasClass('show-right-menu')).not.toBe(true);
			});

			/* ensure the menu changes visibility when the clip
					 * btn is clicked. Test both show and hide
					*/
			it('should change visibility when button is clicked', function() {
				// process: trigger then check
				clip_btn.click();
				expect(clip_menu.hasClass('show-right-menu')).toBe(true);
				clip_btn.click();
				expect(clip_menu.hasClass('show-right-menu')).toBe(false);
			});
		});

		/* 'Read Later' buttons should add the link entry
		 * to a special list accessed by clicking 'Clips'
		 */
		describe('Read Later buttons', function() {
			// test 3 expectations (currently third will fail):
			// 1 - the number of clip entries increases by 1
			// 2 - content url is same as clicked entry
			// 3 - new clip will be unique; not added before
			var test_index = Math.floor(Math.random() * $('.entry').length),
					prev_num_entries = $('.clip-item').length,
					clip_links,
					new_clip_title,
					clicked_title,
					occurences = 0;

			// trigger a 'read later' add and cache that data
			// for comparison below
			beforeAll(function() {
				clip_links = $('.clip-link');
				clip_links.eq(test_index).click(); // trigger click
				new_clip_title = $('.clip-item').last().text();
				clicked_title = clip_links[test_index].dataset.title;
			});

			/* ensure the link is added to clip list when 'Read Later' is clicked */
			it('should add a link entry to Clip List when a Read Later button is clicked', function() {
					// did number of clips increase?
					expect($('.clip-item').length).toBeGreaterThan(prev_num_entries);
					// did correct content get added?
					expect(new_clip_title).toBe(clicked_title);
			});

			/* ensure that same feed entry can't be clipped twice
			 */
			it('should not add the same entry twice', function() {
				// trigger click on same entry
				clip_links.eq(test_index).click();

				// was the item already in the clip list?
				$('.clip-item').each(function() {
					if (this.text === new_clip_title) {
						occurences++; //# of times article appears in list
					}
				});
				expect(occurences).toBeLessThan(2);
			});
		});
}());
