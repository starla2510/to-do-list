function add() {
    // Ambil nilai teks
    const newText = document.getElementById('new-text').value;

    // Tambahkan teks ke dalam daftar baru
    const todo = document.getElementById('todo');

    const pBaru = '<li><span><input class="checkBox" onclick="toggle(this)" type="checkbox">' + newText + '</span>' +  '<span class="checkBox" onclick="remove(this)"> X</span>' + '</li>';
    todo.insertAdjacentHTML("afterbegin", pBaru);

    // Kosongkan fieldnya
    document.getElementById('new-text').value = "";

    // Simpan daftar ke Local Storage
    saveListToLocalStorage();
}

function toggle(el) {
    el.parentElement.classList.toggle('done');

    // Simpan status checkbox ke Local Storage
    saveCheckboxStatusToLocalStorage();
}

function remove(el) {
    el.parentElement.remove();

    // Simpan daftar ke Local Storage setelah perubahan dilakukan
    saveListToLocalStorage();
}

function saveListToLocalStorage() {
    const todoList = document.getElementById('todo').innerHTML;
    localStorage.setItem('todoList', todoList);
}

function saveCheckboxStatusToLocalStorage() {
    const checkboxes = document.getElementsByClassName('checkBox');
    const checkboxStatus = {};

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const checkboxId = checkbox.parentElement.textContent.trim();
        const isChecked = checkbox.checked;
        checkboxStatus[checkboxId] = isChecked;
    }

    localStorage.setItem('checkboxStatus', JSON.stringify(checkboxStatus));
}

function loadListFromLocalStorage() {
    const savedList = localStorage.getItem('todoList');
    if (savedList) {
        document.getElementById('todo').innerHTML = savedList;
    }

    // Memulihkan status checkbox dari Local Storage
    const savedCheckboxStatus = localStorage.getItem('checkboxStatus');
    if (savedCheckboxStatus) {
        const checkboxStatus = JSON.parse(savedCheckboxStatus);

        const checkboxes = document.getElementsByClassName('checkBox');
        for (let i = 0; i < checkboxes.length; i++) {
            const checkbox = checkboxes[i];
            const checkboxId = checkbox.parentElement.textContent.trim();
            const isChecked = checkboxStatus[checkboxId];

            if (isChecked) {
                checkbox.checked = true;
                checkbox.parentElement.classList.add('done');
            }
        }
    }
}

// Memuat daftar dari Local Storage saat halaman dimuat
window.addEventListener('DOMContentLoaded', loadListFromLocalStorage);
