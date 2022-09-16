import { notesArr, notesStatistic, categories, unzip } from './storage.js';
import { setupStaticListners, contentForSecondModal, refreshListners } from './utils.js';

const notesContainer = document.querySelector('.notes-list');
const renderStatistic = document.querySelector('.notes-statistic-cards');
const modal = document.querySelector('.modal-content');
const secondModal = document.querySelector('.modal-content-statistic-category');
const changeNoteModal = document.querySelector('.change-note-modal-container');

class Renderer {
    constructor(notesArr, notesStatistic, categories) {
        this.notesArr = notesArr;
        this.notesStatistic = notesStatistic;
        this.categories = categories;
    }

    renderListNotes() {
        notesContainer.innerHTML = '';

        try {
            const notesHtmlArr = this.buildListOfNotes(notesArr);

            notesHtmlArr.forEach(note => {
                notesContainer.innerHTML += note;
            });

            refreshListners();
            this.renderStatistic();
            contentForSecondModal();
            this.changeNote();
            this.selectedStatisticCategory();
        } catch (e) {
            console.log(e)
        }
    }

    buildListOfNotes(notesArr) {
        let notesHtmlArr = notesArr.map(note => {
            const category = categories[note.category];

            return (`
                <div class='notes-info-card'>
                    <div class="card-icon"><i class="${category.icon}"></i></div>
                    <div class="card-name">${note.name}</div>
                    <div class="card-created">${note.created}</div>
                    <div class="card-category">${category.label}</div>
                    <div class="card-content">${note.content}</div>
                    <div class="card-dates">${note.dates}</div>
                    <div id="notes-card notes-images" class="notes-card notes-images">
                        <div class="card-notes-image"><i class="bi bi-pencil-fill" id="pencil-${note.id}-pencil"  data-bs-toggle="modal" data-bs-target="#changeNote"></i></div>
                        <div class="card-notes-image"><i class="bi bi-file-earmark-zip-fill" id="earmark-${note.id}-archive"></i></div>
                        <div class="card-notes-image"><i class="bi bi-trash-fill" id="trash-${note.id}-delete"></i></div>
                    </div>
                </div>
            `);
        })

        return notesHtmlArr;
    }

    renderStatistic() {
        renderStatistic.innerHTML = ``;

        notesStatistic.forEach(note => {
            const active = note.active;
            const archived = note.archived.length;
            const category = categories[note.category];

            renderStatistic.innerHTML += `
                <div class="notes-statistic-card" id='statistic-${category.label}' data-bs-toggle="modal" data-bs-target="#exampleSecondModal">
                    <div class="notes-statistic-icon"><i class="${category.icon}"></i></div>
                    <div class="notes-statistic-name">${category.label}</div>
                    <div class="notes-statistic-active">${active}</div>
                    <div class="notes-statistic-archived">${archived}</div>
                </div>
            `
        })
    }

    renderModal() {
        modal.innerHTML = `
            <h2>Create a new note</h2>
            <div class="create-new-note">
                <div class="new-note-name">
                    <label for="new-note-name">Enter name</label>
                    <br>
                    <input type="text" id="new-note-name-input">
                </div>
                <div class="new-note-category">
                    <div>Select category</div>
                    <select id="new-note-category-option">
                        <option value="task">Task</option>
                        <option value="randomThought">Random Thought</option>
                        <option value="idea">Idea</option>
                        <option value="quote">Quote</option>
                    </select>
                </div>
                <div class="new-note-info">
                    <label for="new-note-info">Enter information</label>
                    <br>
                    <input type="text" id="new-note-info-input">
                </div>
                <div class="new-note-date-container">
                    <div>
                        <label for="start">Enter start date</label>
                        <br>
                        <input type="date" id="start-date" />
                    </div>
                    <div>
                        <label for="end">Enter end date</label>
                        <br>
                        <input type="date" id="end-date" />
                    </div>
                </div>
            </div>
            <div class="modal-content-add-note"><button class="modal-content-add-note-btn">Add note</button></div>
        `

        setupStaticListners();
    }

    selectedStatisticCategory(contentForModal) {
        if (contentForModal === undefined) {
            secondModal.innerHTML = '';
        } else {
            secondModal.innerHTML = '';

            contentForModal.forEach((note) => {
                secondModal.innerHTML += `
                    <div class='notes-info-card'>
                        <div class="statistic-card-name">${note.name}</div>
                        <div class="statistic-card-created">${note.created}</div>
                        <div class="statistic-card-content">${note.content}</div>
                        <div class="statistic-card-dates">${note.dates}</div>
                        <div id="notes-card notes-images" class="notes-card notes-images">
                            <div class="statistic-card-notes-image"><i class="bi bi-file-earmark-zip-fill ziped" id="earmark-${note.id}-archived"></i></div>
                        </div>
                    </div>
                `
            })

            unzip(contentForModal);
        }
    }

    changeNote() {
        changeNoteModal.innerHTML = `
            <h2>Change Note</h2>
            <div class="create-new-note">
                <div class="new-note-name">
                    <label for="new-note-name">Enter name</label>
                    <br>
                    <input type="text" id="change-note-name-input">
                </div>
                <div class="new-note-category">
                    <div>Select category</div>
                    <select id="change-note-category-option">
                        <option value="task">Task</option>
                        <option value="randomThought">Random Thought</option>
                        <option value="idea">Idea</option>
                        <option value="quote">Quote</option>
                    </select>
                </div>
                <div class="new-note-info">
                    <label for="new-note-info">Enter information</label>
                    <br>
                    <input type="text" id="change-note-info-input">
                </div>
                <div class="new-note-date-container">
                    <div>
                        <label for="start">Enter start date</label>
                        <br>
                        <input type="date" id="start-date" />
                    </div>
                    <div>
                        <label for="end">Enter end date</label>
                        <br>
                        <input type="date" id="end-date" />
                    </div>
                </div>
            </div>
            <div class="modal-content-add-note"><button class="modal-content-change-note-btn">Save note</button></div>
        `
    }
}

export const renderPage = new Renderer(notesArr, notesStatistic, categories);

renderPage.renderModal();
renderPage.renderListNotes();
renderPage.renderStatistic();