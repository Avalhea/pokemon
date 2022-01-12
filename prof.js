document.getElementById('date').valueAsDate = new Date();
document.getElementById('savoir').focus();
$('#savoir').click(() => console.log("jQuery"));


function appelapi() {
    setTimeout(async, 5000);
}

function async() {
    $.ajax(
        {
            url: 'https://api.chucknorris.io/jokes/random',
            method: 'GET'
        }
    ).done(
        function (donnees, statut, xhr) {
            $('#chucknorris').text(donnees.value);
        }
    );
}


function ajouter() {
    // let savoir = document.getElementById('savoir').value;
    let savoir = $('#savoir').val();
    let auteur = document.getElementById('auteur').value;
    let date = document.getElementById('date').valueAsDate;

    if (savoir !== '' && auteur !== '' && date !== '') {
        // let nouvelElement = document.createElement('li');
        let nouvelElement = $('<li></li>');
        // let pSavoir = document.createElement('p');
        // pSavoir.innerText = savoir;
        let pSavoir = $('<p>' + savoir + '</p>');
        let pAuteur = document.createElement('p');
        pAuteur.innerText = auteur;
        let pDate = document.createElement('p');
        pDate.innerText = (date.getDate()).toString().padStart(2, "0") + '/'
            + (date.getMonth() + 1).toString().padStart(2, "0") + '/'
            + date.getFullYear();
        // nouvelElement.appendChild(pSavoir);
        nouvelElement.append(pSavoir);
        nouvelElement.append(pAuteur);
        nouvelElement.append(pDate);
        // nouvelElement.innerText = savoir + ' par ' + auteur + ' le ' + date;
        nouvelElement.className = 'elementNouveau';


        // nouvelElement.addEventListener('click', supprimer);
        // nouvelElement.on('click', supprimer);
        // nouvelElement.click(supprimer());
        nouvelElement.click(
            function () {
                console.log("jQuery");
            }
        );
        nouvelElement.click(() => console.log("jQuery"));

        $('#liste').append(pSavoir);
        document.getElementById('savoir').value = '';
        document.getElementById('auteur').value = '';
    } else {
        alert('Tous les champs doivent etre remplis.');
    }
}

function supprimer() {
    if (confirm(this.firstChild.innerText + ' doit etre supprimé ?')) {
        this.remove();
    }
}