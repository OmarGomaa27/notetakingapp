const notes = [];

function addNote(title, content) {
    const note = {
        id: notes.length + 1,
        title: title,
        content: content,
    };
    notes.push(note);
}

function viewNotes() {
    notes.forEach(note => {
        console.log(`ID: ${note.id} - Title: ${note.title}\nContent: ${note.content}\n`);
    });
}

function deleteNote(id) {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        console.log(`Note with ID ${id} deleted.`);
    } else {
        console.log(`Note with ID ${id} not found.`);
    }
}

function editNote(id, newTitle, newContent) {
    const note = notes.find(note => note.id === id);
    if (note) {
        note.title = newTitle;
        note.content = newContent;
        console.log(`Note with ID ${id} updated.`);
    } else {
        console.log(`Note with ID ${id} not found.`);
    }
}


addNote("First Note", "This is the content of the first note.");
addNote("Second Note", "This is the content of the second note.");
viewNotes();
deleteNote(1);
editNote(2, "Updated Second Note", "This is the updated content.");
viewNotes();