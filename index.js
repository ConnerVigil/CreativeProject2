function onClick(e) {
  e.preventDefault();
  let word = document.getElementById("inputWord").value;

  if (word === "") {
    return;
  }

  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

  fetch(url)
    .then(function (response) {
      if (response.status != 200) {
        return {
          text:
            "Error calling the Dictionary API service: " + response.statusText,
        };
      }
      return response.json();
    })
    .then(function (json) {
      var myList = document.getElementById("definitions");
      myList.innerHTML = "";

      for (var i = 0; i < json[0].meanings[0].definitions.length; i++) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(
          json[0].meanings[0].definitions[i].definition
        );
        node.appendChild(textnode);
        document.getElementById("definitions").appendChild(node);
      }
    });
}

function updateResult(info) {
  document.getElementById("definition").innerHTML = info;
  clearInput();
}

function clearInput() {
  document.getElementById("inputWord").value = "";
}

document.getElementById("submitButton").addEventListener("click", onClick);
