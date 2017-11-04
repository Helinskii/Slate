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
  var newNoteTitle = document.createElement('h3');

  newNoteContainer.innerHTML += '<button title="Close" class="note-button note-close" onclick="noteDelete(event)">✘</button>';
  newNoteContainer.innerHTML += '<button title="Edit" class="note-button note-edit" onclick="noteEditStart(event)">📝</button>';

  newNoteTitle.innerHTML = note.title;
  newNoteBody.innerHTML = note.content;

  newNoteContainer.className = "note";
  newNoteContainer.className += " " + priorityClasses[note.priority];
  newNoteTitle.className = "note-title";
  newNoteBody.className = "note-body";

  newNoteContainer.id = "note-" + note.id;

  newNoteContainer.appendChild(newNoteTitle);
  newNoteContainer.appendChild(newNoteBody);

  document.querySelector('#notes-container').appendChild(newNoteContainer);
}

function noteDelete(event) {
  var elementToDelete = event.target.parentNode;
  elementToDelete.remove();

  var elementCountId = Number(elementToDelete.id.split('-')[1]);
  for (var i = notes.length - 1; i >= 0; --i) {
    if (notes[i].id == elementCountId) {
      notes.splice(i, 1);
      break;
    }
  }
}
