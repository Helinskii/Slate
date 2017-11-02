'user strict';

var notes = [];
var noteCount = 0;
var priorityClasses = {
  3 : 'high',
  2 : 'medium',
  1 : 'low',
};

function noteCreate() {
  var newNote = {};
  newNote.id = noteCount;
  newNote.title = $("#title-input").val();
  newNote.content = $("#content-input").val();
  newNote.priority = $(".priority").val();

  noteCount++;
  notes.push(newNote);
  noteAdd(newNote);
}

function noteAdd(note) {
  var newNoteContainer = document.createElement('div');
  var newNoteBody = document.createElement('div');
  var newNoteTitle = document.createElement('h2');

  newNoteTitle.innerHTML = note.title;
  newNoteBody.innerHTML = note.content;

  newNoteContainer.className = "note";
  newNoteContainer.className = " " + priorityClasses[note.priority];
  newNoteTitle.className = "note-title";
  newNoteBody.className = "note-body";

  newNoteContainer.id = "note-" + note.id;

  newNoteContainer.appendChild(newNoteTitle);
  newNoteContainer.appendChild(newNoteBody);

  newNoteContainer.innerHTML += '<button title="Edit" class="note-button note-edit" onclick="noteEditStart(event)">📝</button>';
  newNoteContainer.innerHTML += '<button title="Close" class="note-button note-close" onclick="noteDelete(event)">✘</button>';

  document.querySelector('#note-area').appendChild(newNoteContainer);
}
