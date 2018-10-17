'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {

      // review: We need to take every author name from the page, and make it an option in the Author filter.
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
      $('article').hide();
      
      $('[data-author ="' + $(this).val() + '"]').fadeIn();
      
      console.log($(this).val());


      // : If the select box was changed to an option that has a value, we need to hide all the articles,
      //       and then show just the ones that match for the author that was selected.
      //       Use an "attribute selector" to find those articles, and fade them in for the reader.

    } else {
        $('article').show();
        $('.template').hide();



    }
    $('#author-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  console.log('hey')
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      
      $('[data-category ="' + $(this).val() + '"]').fadeIn();
      console.log($(this).val());





    } else {
      $('article').show();
      $('.template').hide();
  


    
  }

  $('#category-filter').val('');

});
};

articleView.handleMainNav = function() {
  $('.tab').on('click', function(){

    
    $('.tab-content').hide();
    var $tabContent = $(this).data('content');
    $('#' + $tabContent).show(); 
    
    

  });




  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.
  $('.read-on').on('click', function(event){
  event.preventDefault();
  $(this).closest('article').find(':hidden').show();
  $(this).text('Show Less');
  })

  // STRETCH GOAl!: change the 'Read On' link to 'Show Less'

};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
