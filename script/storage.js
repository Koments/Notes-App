import { renderPage } from './render.js';
import { infoFroChangeNote } from './utils.js';

export let notesArr = [
    {
        id: 1,
        name: 'Shopping list',
        created: 'April 20, 2021',
        category: 'task',
        content: 'Tomatoes, bread',
        dates: ''
    }, {
        id: 2,
        name: 'The theory of evolution',
        created: 'April 27, 2021',
        category: 'randomThought',
        content: 'The evolution of earth',
        dates: ''
    }, {
        id: 3,
        name: 'New Feature',
        created: 'May 05, 2021',
        category: 'idea',
        content: 'Implement new technology in the face of resistance ',
        dates: '3/5/2021, 5/5/2021'
    }, {
        id: 4,
        name: 'William Gaddis',
        created: 'May 07, 2021',
        category: 'quote',
        content: "Power doesn't corrupt. It just exposes who leaders really are. ",
        dates: ''
    }, {
        id: 5,
        name: 'Books',
        created: 'May 07, 2021',
        category: 'task',
        content: 'The Lean Startup',
        dates: ''
    }
];

export const categories = {
    task: {
        icon: 'bi bi-cart-fill',
        label: 'Task'
    },
    randomThought: {
        icon: 'bi bi-gear-fill',
        label: 'random Thought'
    },
    idea: {
        icon: 'bi bi-lightbulb',
        label: 'Idea'
    },
    quote: {
        icon: 'bi bi-info-circle',
        label: 'Quote'
    }
};

export let notesStatistic = [
    {
        id: 1,
        category: 'task',
        archived: [],
        active: 2
    }, {
        id: 2,
        category: 'randomThought',
        archived: [],
        active: 1
    }, {
        id: 3,
        category: 'idea',
        archived: [],
        active: 1
    }, {
        id: 4,
        category: 'quote',
        archived: [],
        active: 1
    }
];

export function setNewNote(newNote) {
    notesArr.push(newNote);
    let num = 1;

    notesStatistic.map((statisticsCategory) => {
        if (statisticsCategory.category === newNote.category) {
            return statisticsCategory.active += num;
        }
    })

    renderPage.renderListNotes();
}

export function settingToNotesArr(newNotesSetting) {
    for (let [key, value] of newNotesSetting.entries()) {
        value = parseInt(value, 10);
        const selectedNote = notesArr.filter(note => note.id === value);
        let num = 1;

        if (key === 'pencil') {
            notesArr.map((note) => {
                if (note.id === value) {
                    infoFroChangeNote(note);
                }
            })
        } else {
            const withoutDeletedNote = notesArr.filter(note => note.id !== value);
            notesArr = withoutDeletedNote;

            notesStatistic.map((statistickCategory) => {
                if (statistickCategory.category === selectedNote[0].category) {
                    statistickCategory.active -= num;

                    if (key === 'archive')
                        statistickCategory.archived.push(selectedNote[0]);

                    renderPage.renderListNotes();
                }
            });
        }
    }
}

export function setChangesOnNote(noteAfterChanges, changeNoteCategory) {
    notesArr.map((note) => {
        if (note.id === noteAfterChanges.id) {
            notesArr = notesArr.filter(note => note.id != noteAfterChanges.id);
            notesArr.push(noteAfterChanges)
            notesArr = notesArr.sort(function (a, b) { return a.id - b.id });
        }
    });

    if (noteAfterChanges.category != changeNoteCategory) {
        notesStatistic.forEach((note) => {
            if (note.category === noteAfterChanges.category){
                note.active += 1;
            }

            if (note.category === changeNoteCategory) {
                note.active -= 1;
            }
        })
    };

    renderPage.renderListNotes();
}


export function unzip(archivedNotes) {
    const unzippedNoteContainer = document.querySelectorAll('.ziped');

    unzippedNoteContainer.forEach(statisticElements => {

        statisticElements.addEventListener('click', (statisticElement) => {
            const id = statisticElement.target.id.split('-');
            const idNote = parseInt(id[1], 10);

            notesStatistic.map((noteStatistic) => {
                archivedNotes.forEach((note) => {
                    if (note.id === idNote && note.category === noteStatistic.category) {
                        noteStatistic.archived = noteStatistic.archived.filter(note => note.id != idNote);
                        setNewNote(note);
                    }
                })
            });
        });
    });
}