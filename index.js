let names = [];
let choosers = [];
let chosenPairs = {};
let picks = 2;
let firstPick = true;
let currentChooser;

$("#submit").click(() => {
  let inputName = $("#name")[0].value;
  if (inputName !== "") {
    names = [...names, inputName];

    UpdateWithNames();
    $("#name").val("");
  }
});

const UpdateWithNames = () => {
  $("#NameContainer").empty();
  names.forEach((name, i) => {
    $("#NameContainer").append(
      `<div class="Names"><p style='display: inline-block;'>${name}</p><button class='DeleteName' data-nameindex='${i}'>Remove</button></div>`
    );
  });

  $(".DeleteName").click((e) => {
    let nameIndex = e.target.attributes["data-nameindex"].value;
    names.splice(nameIndex, 1);

    UpdateWithNames();
  });

  if (names.length >= 2) {
    $("#LockNames").show();
  } else {
    $("#LockNames").hide();
  }
};

$("#name").keypress((e) => {
  if (e.key === "Enter") {
    $("#submit").click();
  }
});

$("#LockNames").click(() => {
  $("#NamePhase").fadeOut(250);
  $("#NameGeneratorPhase").delay(225).fadeIn(250);

  SetupGenerator();
});

const RandomNum = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const SetupGenerator = () => {
  $("#PickReciever").hide();
  choosers = names;
  let num = RandomNum(choosers);
  let chooserName = choosers[num];
  currentChooser = num;
  $("#ChoosersName")[0].innerText += ` ${chooserName}`;

  $("#PickReciever").delay(1000).fadeIn(250);
};

$("#PickReciever").click(() => {
  if (firstPick || picks > 0) {
    let num = currentChooser;
    while (num === currentChooser) {
      num = RandomNum(names);
    }

    $("#ReRollButton")[0].innerText += `(${picks})`;

    $("#NameSection").append(`<p>${names[num]}</p>`);
    $("#ReRollButton").delay(1000).fadeIn(250);
    $("#LockInPick").delay(1000).fadeIn(250);
    console.log(names[num]);
  }

  if (!firstPick && picks > 0) picks -= 1;
  firstPick = false;
});

$(document).ready(() => {
  const d = new Date();
  $("#LockNames").hide();

  $("#NameGeneratorPhase").hide();
  $("#ReRollButton").hide();
  $("#LockInPick").hide();

  $("#FooterText")[0].innerText += ` ${d.getFullYear()}`;
});
