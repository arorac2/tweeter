/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Create tweet element based on tweet object
  const $errorMessage = $("#error-message");
  const createTweetElement = function (tweet) {
    const $tweet = $(`
        <article class="tweet">
          <header>
            <div class="user-info">
              <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
              <h4 class="username">${tweet.user.name}</h4>
            </div>
            <p class="user-handle">${tweet.user.handle}</p>
          </header>
          <div class="tweet-content">
            <p>${tweet.content.text}</p>
          </div>
          <footer>
            <p class="timestamp">${timeago.format(tweet.created_at)}</p>
            <div class="icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
      `);

    return $tweet;
  };

  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");
    $tweetsContainer.empty(); // Clear the container before rendering new tweets

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
    
  };

  // Event listener for form submission
  $("form").submit(function (event) {
    event.preventDefault(); 
    const tweetContent = $("#tweet-text").val();

    // Perform validation checks
    if (!tweetContent) {
        $("#error-message").text("Error: Tweet content cannot be empty").slideDown();
    
      return; // Exit the function to prevent form submission
    }

    if (tweetContent.length > 140) {
        $("#error-message").text("Error: Tweet content exceeds the maximum length of 140 characters").slideDown();
      return; // Exit the function to prevent form submission
    }

    // Serialize the form data
    const formData = $(this).serialize();

    // Send the serialized data to the server
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData,
    })
      .done(function (response) {
        loadTweets();
        $(event.target).trigger("reset");
        $("#tweet-text").trigger("input");
      })
      .fail(function (error) {
        // Handle the error response from the server
        console.error("Error submitting tweet:", error);
      });

    // Clear the form input field
    $(this).trigger("reset");
  });

  $("#tweet-text").on("input", function () {
    $errorMessage.slideUp(); // Hide the error message
  });


  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function (response) {
        data = response;
        renderTweets(data);

        const firstTweet = $(".tweet").first(); // Select the first tweet element
        if (firstTweet.length > 0) {
          const username = firstTweet.find(".username").text();
          $("#username").text(username);
        }
      },
      error: function (error) {
        console.error("Error loading tweets:", error);
      },
    });
  };

  // Call the loadTweets function to fetch and render tweets on page load
  loadTweets();

  $("#scroll-icon").click(function () {
    const makeTweetSection = $(".new-tweet");
    const scrollTo = makeTweetSection.offset().top - 100; // Adjust the value as needed
    $("html, body").animate({ scrollTop: scrollTo }, 500); // Adjust the animation speed as needed
  });
});
