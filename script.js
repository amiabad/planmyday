$(document).ready(function () {
  // Display current day and time
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Get current hour in 24-hour format
  var currentHour = dayjs().hour();

  // Loop through each time block
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare block hour with current hour and update styles accordingly
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });

  // Save button click event
  $(".saveBtn").on("click", function () {
    var timeBlock = $(this).closest(".time-block");
    var hour = timeBlock.attr("id").split("-")[1];
    var description = timeBlock.find(".description").val();

    // Save the data to localStorage (you may want to enhance this to use a backend server)
    localStorage.setItem("schedule-" + hour, description);
  });

  // Load saved data from localStorage on page load
  $(".time-block").each(function () {
    var hour = $(this).attr("id").split("-")[1];
    var savedDescription = localStorage.getItem("schedule-" + hour);

    if (savedDescription) {
      $(this).find(".description").val(savedDescription);
    }
  });
});
