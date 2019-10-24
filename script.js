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
        })
    };
    $(document).on("click", "#submitButton", function () {
        event.preventDefault();
        var userText = $("#userInput").val().trim();
        //var result = replaceSpace.replace(/\s/g, "+");
        videoGames.push(userText);
        console.log(videoGames)
        //$(userText).val($("#userInput")).text($("#userInput"));
        searchGif(userText);
        addButton(userText);
    });
    function createButtons() {
        for (let i = 0; i < videoGames.length; i++) {
            var but = $("<button>");
            but.text(videoGames[i])
                .attr("data-name", videoGames[i])
                .addClass("gifButton");
            $("#boxBox").append(but);
        }
    }
    $(document).on("click", ".gifButton", function () {
        event.preventDefault();
        var newInterface = $(this).attr("data-name");
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
