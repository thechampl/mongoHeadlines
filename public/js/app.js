// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'mongoHeadliness' (JSON) and creates a table body
function displayResults(mongoHeadlines) {
    // First, empty the table
    $("#results").empty();
  
    // Then, for each entry of that json...
    mongoHeadlines.forEach(function(mongoHeadlines) {
      // Append each of the mongoHeadlines's properties to the table
      $("#results").append("<tr><td style=max-width:100px>" + mongoHeadlines.title + "</td>" +
                           "<td>" + "<a href =" + mongoHeadlines.link + ">" +  "<button type=button class=btn-primary>Link</button>" + "</a>" + "</td>" +
                           "<td> <div id=comments class=form-group><label for=comments>Comments</label><textarea class=form-control id=comments rows=3>" + "</textarea></div></form></td>"
                            + "<td><button type=button class=btn-success id=save>" + "Save" + "</button></td></tr>");
                          });
                           $("#scrape").on("click", function(){
                              $()
                           })
  
// $("#save").on("click", function(){
//   db.mongoHeadlines.insert({
//     title: this.title,
//     link: "https://stackoverflow.com" + this.link,
//     comments: $("#comments").text(),
//     favorite: true
//     });

// });


  
  // First thing: ask the back end for json with all mongoHeadliness
  $.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });


  
