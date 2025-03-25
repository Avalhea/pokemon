$(pokemon).focus();
$("#iconeType1Pokemon").hide();
$("#iconeType2Pokemon").hide();
$("#left").hide();
$("#right").hide();


function selectTypeIcon(type) {

    let lien;

    switch (type) {

        case 'bug' : lien = "types/bug.png" ; break;
        case 'dark' : lien = "types/dark.png" ; break;
        case 'dragon' : lien = "types/dragon.png" ; break;
        case 'electric' : lien = "types/electric.png" ; break;
        case 'fairy' : lien = "types/fairy.png";break;
        case 'fighting' : lien = "types/fighting.png";break;
        case 'fire' : lien = "types/fire.png";break;
        case 'flying' : lien = "types/flying.png";break;
        case 'ghost' : lien = "types/ghost.png";break;
        case 'grass' : lien = "types/grass.png";break;
        case 'ground' : lien = "types/ground.png";break;
        case 'ice' : lien = "types/ice.png";break;
        case 'normal' : lien = "types/normal.png";break;
        case 'poison' : lien = "types/poison.png";break;
        case 'psychic' : lien = "types/psychic.png";break;
        case 'rock' : lien = "types/rock.png";break;
        case 'steel' : lien = "types/steel.png";break;
        case 'water' : lien = "types/water.png";break;
        default : lien = "";

    }
    return lien;
}

document.querySelector('#pokemon').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let pokemon = $('#pokemon').val().toLowerCase();
        afficher(pokemon);
        
        $("#left").show();
        $("#right").show();
    }
});

$(document).ready(function () { 
    afficher('1'); 
    $("#left").show();
    $("#right").show();
});


function getPrevNext(pokemon, id) {
    $.ajax(
        {
            url: 'https://pokeapi.co/api/v2/pokemon/'+ pokemon,
            method: 'GET'
        }
    ).done(
        function (data) { 
            $(id).show();
            $(id).text(data.name);
        }
).fail(function() {
    $('#left').hide();
})}


let pokemonId;
function afficher(pokemon) {

    $('#lpb').text("");

    switch(pokemon) {
        case "king":
        case "blaziken": 
        case "the king":
            pokemon = "blaziken";
            $('#lpb').text("king");
            break;
        case "queen":
        case "mismagius": 
        case "the queen":
        case "429":
            pokemon = "mismagius";
            $('#lpb').text("queen");
            break;
        case "big man":
        case "big man blastoise":
            pokemon = "blastoise";
            $('#lpb').text("big man");
            break;
        case "caratroc":
        case "shuckle":
        case "god": 
        case "the best":
        case "213":
            pokemon = "shuckle";
            $('#lpb').text("god");
            break;
        case "slowpoke":
            $('#lpb').html('<a href="https://youtu.be/Ce5mRvkAePU" target="_blank">click! click!</a>');
            break;
        case "":
            pokemon = 1;
            break;
    }
    

    $.ajax(
        {
            url: 'https://pokeapi.co/api/v2/pokemon/'+ pokemon,
            method: 'GET'
        }
    ).done(
        function (donnees) {
            $(".pokemon-info, #left, #right").show();

            $('#iconePokemon').attr("src",(donnees.sprites.front_default));

            let lien1 = selectTypeIcon(donnees.types[0].type.name);
            let lien2;

            if (typeof(donnees.types[1]) !== 'undefined') {
                $("#iconeType2Pokemon").show();
                lien2 = selectTypeIcon(donnees.types[1].type.name);
                $('#iconeType2Pokemon').attr("src",lien2);

            }
            else {
                $("#iconeType2Pokemon").hide();
            }


            $('#iconeType1Pokemon').attr("src",lien1);

            $("#iconeType1Pokemon").show();

            $('#nomPokemon').text(donnees.name);

            $('#poidsPokemon').text(donnees.weight/10 + "Kg");
            pokemonId = donnees.id;
            $('#idPokemon').text("ID : " + donnees.id);

            getPrevNext(donnees.id-1, "#prev");
            getPrevNext(donnees.id+1, "#next");

    }).fail(function () {
        // ❌ Hide everything if Pokémon is not found
        $(".pokemon-info, #left, #right").hide();

        // Optionally display a message (or remove it)
        alert("that pokemon does NOT exist :( make sure you enter the name in english");
    });
}


function precedent() {
    if(pokemonId > 1) {
        pokemonId --;
        afficher(pokemonId);
    }
}

function suivant() {
    if(pokemonId < 898) {
        pokemonId ++;
        afficher(pokemonId);
    }

}

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".switch input");
    const themeStylesheetId = "blastoise-theme";

    // Function to enable the Blastoise theme
    function enableTheme() {
        if (!document.getElementById(themeStylesheetId)) {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.id = themeStylesheetId;
            link.href = "blastoise.css";
            document.head.appendChild(link);
        }
        localStorage.setItem("theme", "blastoise");
    }

    // Function to disable the Blastoise theme
    function disableTheme() {
        let themeStylesheet = document.getElementById(themeStylesheetId);
        if (themeStylesheet) {
            themeStylesheet.remove();
        }
        localStorage.setItem("theme", "default");
    }

    // Load the saved theme on page load
    if (localStorage.getItem("theme") === "blastoise") {
        enableTheme();
        themeToggle.checked = true;
    }

    // Event listener for theme toggle switch
    themeToggle.addEventListener("change", function () {
        if (this.checked) {
            enableTheme();
        } else {
            disableTheme();
        }
    });
});
