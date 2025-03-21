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


let pokemonId;
function afficher(pokemon) {

    if (pokemon === "king") {
        pokemon = "blaziken"
    }

    if (pokemon === "queen") {
        pokemon = "mismagius"
    }

    if(pokemon === "") {
        pokemon = 1;
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


            $('#iconeType1Pokemon').attr("src",lien1);

            $("#iconeType1Pokemon").show();

            $('#nomPokemon').text("Name : " + donnees.name);
            $('#poidsPokemon').text("Weight : " + donnees.weight/10 + "Kg");
            pokemonId = donnees.id;
            $('#idPokemon').text("ID : " + donnees.id);

    }).fail(function () {
        // ❌ Hide everything if Pokémon is not found
        $(".pokemon-info, #left, #right").hide();

        // Optionally display a message (or remove it)
        alert("wtf");
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