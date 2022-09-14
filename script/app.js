import { notesArr } from './storage.js';

const render = document.querySelector('.notes-list')

class Render {
    constructor(notesArr) {
        this.notesArr = notesArr
    }

    renderListNotes(notesArr) {
        notesArr.forEach((e) => {
            render.innerHTML += `
            <div class='notes-info-card'>
                <div class="card-icon "><i class="${e.icon}"></i></div>
                <div class="card-name"><div>${e.name}</div></div>
                <div class="card-craeted">${e.craeted}</div>
                <div class="card-category">${e.category}</div>
                <div class="card-content">${e.content}</div>
                <div class="card-dates">${e.dates}</div>
                <div class="notes-card notes-images">
                    <div class="card-notes-image"><i class="bi bi-pencil-fill"></i></div>
                    <div class="card-notes-image"><i class="bi bi-file-earmark-zip-fill"></i></div>
                    <div class="card-notes-image"><i class="bi bi-trash-fill"></i></div>
                </div>
            </div>`
        })
    }
}
//.
const renderClass = new Render();
renderClass.renderListNotes(notesArr);