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

function noteEditStart(event) {
  var elementToEdit = event.target.parentNode;
  var elementCountId = Number(elementToEdit.id.split('-')[1]);
  var currentNote = {};

  for (var i = notes.length - 1; i >= 0; --i) {
    if (notes[i].id == elementCountId) {
      currentNote = notes[i];
      break;
    }
  }

  elementToEdit.innerHTML = "";

  elementToEdit.innerHTML += '<input class="title" value="' + currentNote.title + '"></input>';

  elementToEdit.innerHTML += '<textarea class="content">' + currentNote.content + '</textarea>';

  elementToEdit.innerHTML += '<select name="priority" class="priority-edit">' +
                             '<option value="3">High</option>' +
                             '<option value="2">Medium</option>' +
                             '<option value="1">Low</option>' +
                             '</select>';
  elementToEdit.innerHTML += '<button onclick="noteEditFinish(event)">Finish Edit</button>';
}

function noteEditFinish(event) {
  var elementToEdit = event.target.parentNode;
  var elementCountId = Number(elementToEdit.id.split('-')[1]);

  var newTitle = elementToEdit.querySelectorAll('input')[0].value;
  var newContent = elementToEdit.querySelectorAll('textarea')[0].value;
  var newPriority = elementToEdit.querySelectorAll('select')[0].value;

  var newNoteBody = document.createElement('div');
  var newNoteTitle = document.createElement('h3');

  newNoteTitle.innerHTML = newTitle;
  newNoteBody.innerHTML = newContent;

  newNoteTitle.className = "note-title";
  newNoteBody.className = "note-body";

  for (var i = notes.length - 1; i >= 0; --i) {
    if (notes[i].id === elementCountId) {
      notes[i].title =  newTitle;
      notes[i].content = newContent;
      break;
    }
  }

  elementToEdit.innerHTML = "";
  elementToEdit.innerHTML += '<button title="Close" class="note-button note-close" onclick="noteDelete(event)">✘</button>';

  elementToEdit.innerHTML += '<button title="Edit" class="note-button note-edit" onclick="noteEditStart(event)">📝</button>';

  elementToEdit.appendChild(newNoteTitle);
  elementToEdit.appendChild(newNoteBody);

  elementToEdit.className = "note " + priorityClasses[newPriority];
}

function noteSort() {
  var compare = function (a, b) {
    if (a.priority < b.priority)
        return 1;
    if (a.priority > b.priority)
        return -1;
    return 0;
  }

  notes = notes.sort(compare);

  document.querySelector('#notes-container').innerHTML = "";
  for (var i = 0; i < notes.length; ++i) {
    noteAdd(notes[i]);
  }
}
