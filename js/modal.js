// MODAL

const modal = document.querySelector('.modal');
const modalTriggerButton = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');

let modalShown = false;

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modalShown = true;
}

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modalTriggerButton.onclick = () => openModal();

modalCloseButton.onclick = () => closeModal();

modal.onclick = (event) => {
    if (event.target === modal){
        closeModal();
    }
}


// Функция которая по скролу до конца появится модальное окно
const handleScroll = () => {
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

    if (isBottom && !modalShown) {
        openModal();
        window.removeEventListener('scroll', handleScroll);
    }
}

window.addEventListener('scroll', handleScroll);

// Функция для вызова модального окна через 10 секунд
const openModalAfterDelay = () => {
    setTimeout(openModal, 10000);
}

window.onload = openModalAfterDelay;

// Post data

const formElement = document.querySelector('form')

const postData = (url, dataJson) => {
    const response = fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: dataJson
    })
    return response
}

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(form)
        const user = {}
        formData.forEach((item, index) => {
            user[index] = item
        })
        const json = JSON.stringify(user)

        postData('server.php', json)
    }
}

bindPostData(formElement)

// postData('server.php', json)







