'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from an attribute in `this` article element,
      //       and then use that bit of text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>';
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
    //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
    //         onto it.
    if ($(this).val()) {
      let selection = $(this).val();
      $('article').hide();
      $('article[data-author="'+selection+'"]').fadeIn();

    } else {
      $('article').fadeIn(); //
      $('article.template').hide(); // hides the template class
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {

    if ($(this).val()) {
      let selection = $(this).val();
      $('article').hide();
      $('article[data-category="'+selection+'"]').fadeIn();

    } else {
      $('article').fadeIn(); //
      $('article.template').hide(); // hides the template class
    }
    $('#author-filter').val('');
  });

};

articleView.handleMainNav = function() {
  $('.main-nav li .icon-home').on('click', function(event) {
    $('#about').hide();
    $('#articles').fadeIn();
  });

  $('.main-nav li .icon-address-book').on('click', function(event) {// Let's now trigger a click on the first .tab element, to set up the pa
    $('#articles').hide();
    $('#about').fadeIn();
  });
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.
  $('article').on('click', 'a.read-on', function(event){
  event.preventDefault();
  // $(this).text();
  $(this).parent().find('*').fadeIn();
  $(event.target).hide();
});

  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

  // STRETCH GOAl!: change the 'Read On' link to 'Show Less'

};

// TODONE: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
