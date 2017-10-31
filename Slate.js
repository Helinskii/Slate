'user strict';

window.addEventListener("load", function() {
  var storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    noteCount = Number(localStorage.getItem('noteCount'));
    for(var i = 0; i < notes.length; ++i) {
      noteAdd(notes[i]);
    }
  }
});

var notes = [];
var noteCount = 0;
var priorityClasses = {
  3 : 'high',
  2 : 'medium',
  1 : 'low',
};

var add = document.getElementById("add-button");
add.addEventListener("click", addNote);

function noteCreate() {
  var newNote = {};
  newNote.id = noteCount;
  newNote.title = prompt("Enter a name for the note");

}

function addNote() {
  var mainClass = "wholenote" + noteCount;
  var note_name = prompt("Enter a name for the note");
  var div = document.createElement("div");
  var node = document.createTextNode(note_name);
  div.appendChild(node);
  div.className = "note";
  div.className += " " + mainClass;

  var deleteButton = document.createElement("input");
  deleteButton_id = "deletetheNote" + noteCount;
  deleteButton.setAttribute("id", deleteButton_id);
  deleteButton.setAttribute("type", "image");
  deleteButton.setAttribute("src", "Dustbin.png");
  deleteButton.className += "deleteButton";
  div.appendChild(deleteButton);

  var element = document.getElementById("side-bar");
  element.appendChild(div);

  noteArea = document.createElement("div");
  noteArea.className = "note-area";
  noteArea.className += " " + mainClass;
  var noteName = "note" + noteCount;
  noteArea.setAttribute("id", noteName);
  noteArea.setAttribute("contentEditable", "true");
  document.getElementById("main-area").appendChild(noteArea);


  div.addEventListener("click", function() {
    var target = document.getElementById("main-area").children;
    for (var i = 0; i < target.length; i++) {
      target[i].style.display = 'none';
    }
    document.getElementById(noteName).style.display = "block";
    document.getElementById(noteName).focus();

    //setEnd(noteName);
  }, true);

  deleteButton.addEventListener("click", function() {
    var elems = document.getElementsByClassName(mainClass);
    for (var k = elems.length - 1; k >= 0; k--) {
      var parent = elems[k].parentNode;
      parent.removeChild(elems[k]);
    }
  });
  noteCount++;
}
