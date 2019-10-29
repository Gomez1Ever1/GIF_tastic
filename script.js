$(document).ready(function () {
    var videoGames = ["Apex Legends", "God of War", "Battlefield", "Call of Duty", "Fortnite"];
    function searchGif(userInput) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="
            + userInput + "&api_key=P2ibrgEDlquXoNfCiVSp1sw7DqdmwtD2&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            for (let g = 0; g < response.data.length; g++) {
                var newDiv = $("<div>")
                    .attr({
                        "data-value": videoGames[g],
                        "id": videoGames[g],
                        "class": "holdImg"
                    });
                var newImg = $("<img>")
                    .addClass("newImg", "col-6")
                    .attr("src", response.data[g].images.fixed_height_still.url);
                newImg.attr("src-alt", response.data[g].images.fixed_height.url);
                var newRating = $("<p>")
                    .addClass("rating")
                    .text("Rating: " + response.data[g].rating);
                $(newDiv).html(newImg);
                $(newDiv).append(newRating);
                $("#imgHolder").append(newDiv);
            }
        })
        console.log(videoGames)
    }

    $(document).on("click", ".newImg", function () {
        console.log(this);
        var imageInfo = $(this).attr("src");
        $(this).attr("src", $(this).attr("src-alt"));
        $(this).attr("src-alt", imageInfo);
    })
    $(document).on("click", "#submitButton", function () {
        event.preventDefault();
        var userText = $("#userInput").val().trim();
        videoGames.push(userInput);
        $("#imgHolder").empty();
        searchGif(userText);
        addButton(userText);
        $("#userInput").val("");
    });
    function createButtons() {
        for (let i = 0; i < videoGames.length; i++) {
            var but = $("<button>");
            but.text(videoGames[i])
                .attr("data-name", videoGames[i])
                .addClass("gifButton", "col-1");
            $("#boxBox").append(but);
        }
    }
    $(document).on("click", ".gifButton", function () {
        event.preventDefault();
        var newInterface = $(this).attr("data-name");
        $("#imgHolder").empty();
        searchGif(newInterface);
    });
    function addButton(userInput) {
        var newButText = userInput;
        var newButton = $("<button>")
            .text(newButText)
            .attr("data-name", newButText)
            .addClass("gifButton");
        $("#boxBox").append(newButton);
    }
    createButtons();
})