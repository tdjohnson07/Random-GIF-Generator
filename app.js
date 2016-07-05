$(document).ready(function(){
  //Global varible declartion
  var brightClick=0;  //used to change color of caption
  var upClick=0;   // used to move caption up and down
  var rightClick=0;  //used to move caption right and Left
  var sizeClick=0;  //used to change font size of caption
  var captionSubmit=false;  //specifies if a caption was submitted
  var results=[];  //empty array to hold search results
  var nextClick=5;  //variable number to tell next button where to start on click must be kept 5 lower than nextEnd
  var nextEnd=10; //varible number to tell next button where to stop, must be 5 higher than nextClick
  var height=0;  //set to image height once filled to determine caption postioning
  var width=0; // set to image width once filled to determine caption postioning
  //function to reset and show buttons for caption manipulation
  function resetShowButtons(){
    brightClick=0;
    upClick=0;
    rightClick=0;
    sizeClick=0;
    captionSubmit=false;
    $("#addCaption, #brighter, #moveDown, #moveRight, #size").show();
    $("#brighter").text("Change Color");
    $("#moveDown").text("Move Down");
    $("#moveRight").text("Move right");
  }
  //function to reset random image to none, remove caption,
  // remove search list, and hide caption buttons
  function resetField(){
    $(".container img").replaceWith("<img></img>");
    $("#next").remove();
    $("#prev").remove();
    $(".container h4").replaceWith("<h4></h4>");
    $(".container ul").replaceWith("<ul></ul>");
    $("#addCaption, #brighter, #moveDown, #moveRight, #size").hide();
  }
  //function to empty search list and remove caption and reset nextButtons
  function emptySearch(){
    $(".container ul").replaceWith("<ul></ul>");
    $(".container h4").replaceWith("<h4></h4>");
    $("#next").remove();
    $("#prev").remove();
    nextClick=5;
    nextEnd=10;
  }
  //function to empty all search fields
  function clearSearch(){
    $("#stickersSearch").val("");
    $("#gifSearch").val("");
    $("gifTag").val("");
    $("stickersTag").val("");
  }
  //function to scroll next and previous page, iterates five results at a time
  // for a total of 25 results
  function nextButton(){
    $(".container ul").replaceWith("<ul></ul>")
    for (nextClick; nextClick < nextEnd; nextClick++ ) {
      $(".container ul").append("<li><img src="+results[nextClick].images.original.url+"></img></li>");
    }
    nextEnd+=5;
    if(nextEnd===30){
      $("#next").hide();
    }
    $("#prev").remove();
    $(".container ul").after("<button id=\"prev\">Prev</button>")
    $("#prev").on("click", function(){
      $(".container ul").replaceWith("<ul></ul>");
      if(nextEnd===30){
        $("#next").show();
      }
      nextClick-=10;
      nextEnd-=10;
      for (nextClick; nextClick < nextEnd; nextClick++ ) {
        $(".container ul").append("<li><img src="+results[nextClick].images.original.url+"></img></li>");
      }
      nextEnd+=5;
      if (nextEnd===10){
        $("#prev").remove();
      }
    });
  }
  //button functionality for searching gifs
  $("#searchGif").on("submit",function(event){
    event.preventDefault();
    resetField();
    var search=$("#gifSearch").val();
    var site="http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=dc6zaTOxFJmzC";
    clearSearch();
    $.get(site).then(function(response){
      results=response.data;
      for(var i=0; i<5; i++){
        $(".container ul").append("<li><img src="+results[i].images.original.url+"></img></li>");
      }
      $(".container ul").after("<button id=\"next\">Next</button>");
      $("#next").on("click", function(){
        nextButton();
      });
    }).catch(function(){
      console.log("fail");
    });
  });
  //button functionality for searching stickers
  $("#searchStickers").on("submit",function(event){
    event.preventDefault();
    resetField();
    var search=$("#stickersSearch").val();
    var site="http://api.giphy.com/v1/stickers/search?q="+search+"&api_key=dc6zaTOxFJmzC";
    clearSearch();
    $.get(site).then(function(response){
      results=response.data;
      for(var i=0; i<5; i++){
        $(".container ul").append("<li><img src="+results[i].images.original.url+"></img></li>");
      }
      $(".container ul").after("<button id=\"next\">Next</button>");
      $("#next").on("click", function(){
        nextButton();
      });
    }).catch(function(){
      console.log("fail");
    });
  });
  //button functionality for random gif with tag
  $("#tagGif").on("submit",function(event){
    event.preventDefault();
    resetField();
    var search=$("#gifTag").val();
    var site="http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=";
    clearSearch();
    $.get(site).then(function(response){
      var picture=response.data.image_url;
      height=Number(response.data.image_height);
      width=Number(response.data.image_width);
      $(".container img").replaceWith("<img src="+picture+"></img>");
    }).catch(function(){
      console.log("fail");
    });
    resetShowButtons();
  });
  //tag stickers display functionality
  $("#tagStickers").on("submit",function(event){
    event.preventDefault();
    resetField();
    var search=$("#stickersTag").val();
    var site="http://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=";
    clearSearch();
    $.get(site).then(function(response){
      var picture=response.data.image_url;
      height=Number(response.data.image_height);
      width=Number(response.data.image_width);
      $(".container img").replaceWith("<img src="+picture+"></img>");
    }).catch(function(){
      console.log("fail");
    });
    resetShowButtons();
  });
  //button functionality for generating random gifs
  $("#random").on("click", function(){
      emptySearch();
    $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
      .then(function(response){
        var picture=response.data.image_url;
        height=Number(response.data.image_height);
        width=Number(response.data.image_width);
        $(".container img").replaceWith("<img src="+picture+"></img>");
      }).catch(function(){
        console.log("fail");
    });
    resetShowButtons();
  });
  //button functionality for generating random sticker
  $("#stickers").on("click", function(){
    emptySearch();
    $.get("http://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC")
      .then(function(response){
        var picture=response.data.image_url;
        height=Number(response.data.image_height);
        width=Number(response.data.image_width);
        $(".container img").replaceWith("<img src="+picture+"></img>");
      }).catch(function(){
        console.log("fail");
    });
    resetShowButtons();
  });
  //adding caption
  $("#addCaption").on("submit",function(event){
    event.preventDefault();
    resetShowButtons();
    var caption=$("#caption").val();
    $(".container h4").replaceWith("<h4>"+caption+"</h4>");
    $("#caption").val("");
    captionSubmit=true;
  });
  //button for changing color, itterates on brightClick
  $("#brighter").on("click", function(){
    brightClick++;
    switch(brightClick){
      case 0:
        $(".container").find("h4").css("color", "black");
        break;
      case 1:
        $(".container").find("h4").css("color", "white");
        break;
      case 2:
        $(".container").find("h4").css("color", "red");
        break;
      case 3:
        $(".container").find("h4").css("color", "darkblue");
        break;
      case 4:
        $(".container").find("h4").css("color", "lightblue");
        break;
      case 5:
        $(".container").find("h4").css("color", "pink");
        break;
      case 6:
        $(".container").find("h4").css("color", "yellow");
        break;
      case 7:
        $(".container").find("h4").css("color", "green");
        break;
      case 8:
        $(".container").find("h4").css("color", "black");
        brightClick= 0;
        break;
      default:
        console.log(brightClick);
        $(".container").find("h4").css("color", "black");
        console.log("broken");
    }
  });
  //button for moving caption up and down itterates on upClick
  $("#moveDown").on("click", function(){
    if(upClick%2===0 && captionSubmit){
      $(".container").find("h4").css("top",+height+40+"px");
      $("#moveDown").text("move back up");
      upClick++;
    }
    else if(upClick%2===1 && captionSubmit){
      $(".container").find("h4").css("top", "20%");
      $("#moveDown").text("Move Down");
      upClick++;
    }
  });
  //button for moving caption left and right, itterates on rightClick
  $("#moveRight").on("click", function(){
    if (rightClick%2===0 && captionSubmit){
      $(".container").find("h4").css("margin-left","37%");
      $("#moveRight").text("move back Left");
      rightClick++;
    }
    else if(rightClick%2===1 && captionSubmit){
      $(".container").find("h4").css("margin-left","18%");
      $("#moveRight").text("Move right");
      rightClick++;
    }
  });
  //button for changing size of caption, itterates on sizeClick
  $("#size").on("click", function(){
    sizeClick++;
    switch(sizeClick){
    case 1:
      $(".container").find("h4").css("font-size","4em");
      $("#size").text("Make Smaller");
      break;
    case 2:
      $(".container").find("h4").css("font-size","1em");
      $("#size").text("Make bigger");
      break;
    case 3:
      $(".container").find("h4").css("font-size","2em");
      $("#size").text("Make bigger");
      break;
    case 4:
      $(".container").find("h4").css("font-size","3em");
      $("#size").text("Make bigger");
      sizeClick=0;
      break;
    }
  });
  //button for producing top 10 trending gifs
  $("#trending").on("click", function(){
    resetField();
    var site="http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    $.get(site).then(function(response){
      results=response.data;
      for(var i=0; i<10; i++){
        $(".container ul").append("<li><img src="+results[i].images.original.url+"></img></li>");
      }
    }).catch(function(){
      console.log("fail");
    });
  });
  //button for producing top 10 trending stickers
  $("#trendingStickers").on("click", function(){
    resetField();
    var site="http://api.giphy.com/v1/stickers/trending?api_key=dc6zaTOxFJmzC";
    $.get(site).then(function(response){
      results=response.data;
      for(var i=0; i<10; i++){
        $(".container ul").append("<li><img src="+results[i].images.original.url+"></img></li>");
      }
    }).catch(function(){
      console.log("fail");
    });
  });
});
