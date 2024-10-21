const fs = require('fs');
const { stringify } = require('querystring');
const readline = require('readline'); 
const { json } = require('stream/consumers');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const filePath ='./notes.json';
function saveNotes() {
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2), 'utf8');
}


function startApp(){
    console.log("Welcome to my first JavaScript App :) ");
    console.log("1. ADD NOTE");
    console.log("2. VIEW NOTES");
    console.log("3. EDIT NOTE");
    console.log("4. DELETE NOTE");
    console.log("5. SEARCH NOTE");
    console.log("6. EXIT");
    r1.question('Choose an option: ', (answer) => {
        switch (answer) { 

            case '1':
                r1.question("Enter Title: ", (title)=> {
                    r1.question("Enter content: ", (content)=> {
                        addNote(title, content);
                        startApp();
                    });
                });
                break;
            case '2':
                viewNotes();
                startApp();
                break;
            case '3':
                r1.question("Enter Note ID to Edit: ", (id)=> {
                    r1.question("Enter new Title: ", (newTitle)=> {
                        r1.question("Enter new content: ", (newContent)=> {
                            editNote(Number(id), newTitle, newContent);
                            startApp();
                        });
                    });
                });
                break;
            case '4':
                r1.question("Enter Note ID to Delete: ", (id)=> {
                    deleteNote(Number(id));
                    startApp();
                });
                break;
            case '5':
                r1.question("Enter keyword to search: ", (keyword)=> {
                    searchNote(keyword);
                    startApp();
                });
                break;
            case '6': 
                console.log("Exiting...");
                r1.close();
                break;
            default:
                console.log("Invalid option");
                startApp();
                break;
        }
    });
}


startApp();


const notes = [];

function addNote(title, content) {
    const note = {
        id: notes.length + 1,
        title: title,
        content: content,
    };
    notes.push(note);
    saveNotes();
}

function viewNotes() {
    if (notes.length === 0) {
        console.log("No notes available.");
    } else {
        notes.forEach(note => {
            console.log(`ID: ${note.id} - Title: ${note.title}\nContent: ${note.content}\n`);
        });
    }
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

// Updated search function (case-insensitive)
function searchNote(keyword) {
    const lowerKeyword = keyword.toLowerCase(); 
    const results = notes.filter(note => 
        note.title.toLowerCase().includes(lowerKeyword) || note.content.toLowerCase().includes(lowerKeyword)
    );
    
    if (results.length > 0) {
        results.forEach(note => {
            console.log(`ID: ${note.id} - Title: ${note.title}\nContent: ${note.content}\n`);
        });
    } else {
        console.log(`No notes found containing "${keyword}".`);
    }
}


// addNote("First Note", "This is the content of the first note.");
// addNote("Second Note", "This is the content of the second note.");
// viewNotes();
// deleteNote(1);
// editNote(2, "Updated Second Note", "This is the updated content.");
// viewNotes();
// addNote("Test", "This is the test of the final added note");
// viewNotes();
// editNote(2, "test", "new !!");
// viewNotes();