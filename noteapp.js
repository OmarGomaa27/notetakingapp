const readline = require('require');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function startApp(){
    console.log("Welcome to my first JavaScript App :) ");
    console.log("1. ADD NOTE");
    console.log("2. VIEW NOTES");
    console.log("3. EDIT NOTE");
    console.log("4. DELETE NOTE");
    console.log("5. SEARCH NOTE");
    console.log("6. EXIT");
}
//add options
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
addNote("Test", "This is the test of the final added note");
viewNotes();
editNote(2, "test", "new !!");
viewNotes();