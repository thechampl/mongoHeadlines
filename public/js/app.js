$(document).ready(function () {

  function displayResults(mongoHeadlines) {
    // First, empty the table
    $("#results").empty();
    // Then, for each entry of that json...
    mongoHeadlines.forEach(function (mongoHeadlines) {
      var mongoid = mongoHeadlines._id
     

      // Append each of the mongoHeadlines's properties to the table
      $("#results").append('<tr><td style="max-width:100px">' + mongoHeadlines.title + "</td>" +
        "<td>" + "<a href =" + mongoHeadlines.link + ">" + '<button type="button" class="btn-primary">Link</button>' + "</a>" + "</td>" +
        '<td> <div class="comments" data-attr=' + mongoid +  'class="form-group"><label for="comments">Comments</label><textarea class="form-control comments" rows=3>' + "</textarea></div></form></td>"
        + '<td><button data-attr=' + mongoid + ' type="button" class="btn-success save">' + "Save" + "</button></td></tr>")
    });
    $(".save").on("click", function () {
    

      var routeId = $(this).attr("data-attr");
      console.log(routeId)

      $.ajax({
        method: "POST",
        url: "/favorites/" + routeId,
        data: {
          title: mongoHeadlines.title,
          link:  mongoHeadlines.link,
          comments: $(".comments").val,
        }
      }).then(function (data) {
        console.log(data)
      })
    });
  }



  // First thing: ask the back end for json with all mongoHeadliness
  $.getJSON("/all", function (data) {
    // Call our function to generate a table body
    displayResults(data);
  });



  // $("#save").on("click", function(){
  // function saveHeadline(thisId){
  //   $.ajax({ method: "POST", url: "/favorites/" + $(thisId).data("id"), data: { body: $("#comments").val() }
  //   }).then(function(data){ 
  //       console.log(data);
  //   });
  // };
  // });



});