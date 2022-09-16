import { renderPage } from './render.js'
import { notesArr, setNewNote, notesStatistic, settingToNotesArr, setChangesOnNote } from './storage.js';

const options = { year: 'numeric', month: 'short', day: 'numeric' };
const today = new Date();

$(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;

    $('#start-date').attr('min', maxDate);
    $('#end-date').attr('min', maxDate);
});

function getCorrectDate(date) {
    const correctDate = date.split("-").reverse().join('/');

    return correctDate;
};

function createNewNotes() {
    const noteName = document.querySelector('#new-note-name-input').value;
    const noteCategory = document.getElementById('new-note-category-option').value;
    const noteContent = document.getElementById('new-note-info-input').value;
    const noteStartDate = document.getElementById('start-date').value;
    const noteEndDate = document.getElementById('end-date').value;

    let newNoteId = 1;

    if (notesArr.length != 0)
        newNoteId = notesArr[notesArr.length - 1].id + 1;

    const newNote = {
        id: newNoteId,
        name: noteName,
        created: today.toLocaleDateString("en-US", options),
        category: noteCategory,
        content: noteContent,
        dates: getCorrectDate(noteStartDate) + ', ' + getCorrectDate(noteEndDate)
    };

    if (newNote.name === '' || newNote.content === '') {
        alert('Name or content is empty');
        return
    };

    if (newNote.dates === ', ')
        newNote.dates = '';

    setNewNote(newNote);
};

export function refreshListners() {
    const deleteNote = document.querySelectorAll('.bi-trash-fill');
    const archiveNote = document.querySelectorAll('.bi-file-earmark-zip-fill');
    const changeNote = document.querySelectorAll('.bi-pencil-fill');

    let optionIconsArr = [...deleteNote, ...archiveNote, ...changeNote];

    optionIconsArr.forEach(note => {
        note.addEventListener('click', (element) => {
            const id = element.target.id.split('-');
            const trashMap = new Map();
            trashMap.set(id[2], id[1]);
            settingToNotesArr(trashMap);
        });
    });

};

export function setupStaticListners() {
    const addNoteBtn = document.querySelector('.modal-content-add-note-btn');
    addNoteBtn.addEventListener('click', e => { createNewNotes() });
}

export function contentForSecondModal() {
    const openSelectedArchive = document.querySelectorAll('.notes-statistic-card');

    openSelectedArchive.forEach(archiveNote => {

        archiveNote.addEventListener('click', () => {
            const selectedArchive = archiveNote.id.split('-');
            let getNameFromStatistic = selectedArchive[1].toLowerCase();
            if (getNameFromStatistic === 'random thought' )
                getNameFromStatistic = 'randomThought'

            notesStatistic.forEach((staticNotes) => {
                console.log(getNameFromStatistic, staticNotes.category)
                if (getNameFromStatistic === staticNotes.category)
                    renderPage.selectedStatisticCategory(staticNotes.archived);
            })
        })
    })
}


export function infoFroChangeNote(note) {
    const changeNoteBtn = document.querySelector('.modal-content-change-note-btn');

    function checkOnVoid(newNote, note) {
        if (newNote != '') {
            return newNote;
        }

        return note;
    }

    changeNoteBtn.addEventListener('click', () => {
        const changeNoteName = document.querySelector('#change-note-name-input').value;
        const changeNoteCategory = document.getElementById('change-note-category-option').value;
        const changeNoteContent = document.getElementById('change-note-info-input').value;
        const changeNoteStartDate = document.getElementById('start-date').value;
        const changeNoteEndDate = document.getElementById('end-date').value;

        const changesNote = {
            id: note.id,
            name: checkOnVoid(changeNoteName, note.name),
            created: today.toLocaleDateString("en-US", options),
            category: changeNoteCategory,
            content: checkOnVoid(changeNoteContent, note.name),
            dates: getCorrectDate(changeNoteStartDate) + ', ' + getCorrectDate(changeNoteEndDate)
        };

        if (changesNote.dates === ', ')
            changesNote.dates = '';

        setChangesOnNote(changesNote, note.category)
    })
}