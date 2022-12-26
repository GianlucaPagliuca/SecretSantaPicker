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
/* test 2 */
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

//ToDo Make it so that if you ReRoll the name gets added to a "blacklist" and not given back to the user

const ReRollReciever = () => {
    if (firstPick || picks >= 0) {
      if (!firstPick && picks >= 0) picks -= 1;
      let num = currentChooser;
      while (num === currentChooser) {
        num = RandomNum(names);
      }

      let rerollBtn = $('#ReRollButton')[0];
      let rerollBtnText = rerollBtn.innerText;
      if(rerollBtnText.endsWith(')')){
        rerollBtn.innerText = rerollBtnText.substring(0, rerollBtnText.length - 3);
      }
      rerollBtn.innerText += `(${picks})`;
      $('#NameSection').empty();
      $("#NameSection").append(`<p>${names[num]}</p>`);
      if(picks > 0 && !$('#ReRollButton').is(':visible')) {
        $("#ReRollButton").delay(1000).fadeIn(250);
      }
      $("#LockInPick").delay(1000).fadeIn(250);
      
      console.log(picks);
      if(picks <= 0){
        $('#ReRollButton').hide();
      }
    }
    
    firstPick = false;
}

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
  ReRollReciever();
});

$('#ReRollButton').click(() => {
    ReRollReciever();
});

$(document).ready(() => {
  const d = new Date();
  $("#LockNames").hide();

  $("#NameGeneratorPhase").hide();
  $("#ReRollButton").hide();
  $("#LockInPick").hide();

  $("#FooterText")[0].innerText += ` ${d.getFullYear()}`;
});
