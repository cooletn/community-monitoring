$(document).ready(function(){
    $('#search').click(function(){
        $('#results').html('');
        console.log($('#i').val());
        var search_term = $('#i').val();
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: 'http://search.twitter.com/search.json',
            data:{q: search_term},
            success: function(data){
                $.each(data.results, function(index, tweet){
                    $tweets = $(".tweet").first().clone();
                    //console.log(tweet);
                    $tweets.find('.img').attr('src', tweet.profile_image_url)
                    $tweets.find('.name').text(tweet.from_user_name);
                    $tweets.find('.handle').html(twttr.txt.autoLink("@"+tweet.from_user));
                    $tweets.find('.text').html(twttr.txt.autoLink(tweet.text));
                    $tweets.hide().appendTo('#results').delay(400).fadeIn();
                });
            }
        });
    });
});