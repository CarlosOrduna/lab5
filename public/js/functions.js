/*global $*/

$(document).ready(function(){
    
   $(".favoriteIcon").on("click", function(){
       
       //alert($(this).prev().attr("src"));
       
       var imageURL = $(this).prev().attr("src");
       
       if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src","img/fav_on.png");
            updateFavorite("add", imageURL); //insert a new record
       } else {
            $(this).attr("src","img/fav_off.png");
            updateFavorite("delete", imageURL); //delete a new record
       }
   });//click icon
   
//   $(".favoriteIconDelete").on("click", function(){
//          var imageURL = $(this).prev().attr("src");
//          //alert($(this).prev().attr("src"));
//           if ($(this).attr("src") == "img/fav_on.png") {
//               $(this).attr("src","img/fav_off.png");
//               updateFavorite("delete", imageURL);
//           }
//   });
   
   $(".keywordLink").on("click", function(){
       
      // alert($(this).text());
       
       $.ajax({
           method: "get",
           url:    "/api/displayFavorites",
           data:   {
                    "keyword"  : $(this).text().trim(),
           },
           success: function(rows, status) {
               
                $("#favorites").html("");
                
               rows.forEach(function(row , i ){
                   if(i%4 == 0 ){
                       $("#favorites").append("<br>");
                   }
                   $("#favorites").append("<img class='image' src="+ row.imageURL + "width = '200' height = '200'+ >" 
                   + "<img class='favoriteIconDelete'src='img/fav_on.png' width ='20'>");
               });
               
                $(".favoriteIconDelete").on("click", function(){
                    $(this).attr("src","img/fav_off.png");
                    var imageURL = $(this).prev().attr("src");
                    //alert($(this).prev().attr("src"));
                    updateFavorite("delete",imageURL); //call is made / does not delete
                    //alert("keyword");
               });//click icon
    } //sucess
           
    });//ajax
       
       
   });//keywordLink
   
   
   function updateFavorite(action, imageURL) {
       $.ajax({
           method: "get",
           url:    "/api/updateFavorites",
           data:   {"imageURL" : imageURL,
                    "keyword"  : $("#keyword").val(),
                    "action"   : action
           }
          
       });//ajax
   //alert(action + imageURL);
       
   }
});

