// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'mongoHeadliness' (JSON) and creates a table body
function displayResults(mongoHeadlines) {
    // First, empty the table
    $("#results").empty();
  
    // Then, for each entry of that json...
    mongoHeadlines.forEach(function(mongoHeadlines) {
      // Append each of the mongoHeadlines's properties to the table
      $("#results").append("<tr><td>" + mongoHeadlines.title + "</td>" +
                           "<td>" + mongoHeadlines.link + "</td></tr>");
    });
  }
  

  
  // First thing: ask the back end for json with all mongoHeadliness
  $.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
  
