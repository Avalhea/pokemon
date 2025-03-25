document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded!");

const pokemonInput = $('#pokemon');
const leftArrow = $('#left');
const rightArrow = $('#right');
const typeIcons = ['#iconeType1Pokemon', '#iconeType2Pokemon'];

$(document).ready(() => {
    afficher('1');
    leftArrow.show();
    rightArrow.show();
});

const typeIconPaths = {
    bug: "images/types/bug.png",
    dark: "images/types/dark.png",
    dragon: "images/types/dragon.png",
    electric: "images/types/electric.png",
    fairy: "images/types/fairy.png",
    fighting: "images/types/fighting.png",
    fire: "images/types/fire.png",
    flying: "images/types/flying.png",
    ghost: "images/types/ghost.png",
    grass: "images/types/grass.png",
    ground: "images/types/ground.png",
    ice: "images/types/ice.png",
    normal: "images/types/normal.png",
    poison: "images/types/poison.png",
    psychic: "images/types/psychic.png",
    rock: "images/types/rock.png",
    steel: "images/types/steel.png",
    water: "images/types/water.png"
};

function selectTypeIcon(type) {
    return typeIconPaths[type] || "";
}

pokemonInput.on('keypress', function (e) {
    if (e.key === 'Enter') {
        afficher(pokemonInput.val().toLowerCase());
        leftArrow.show();
        rightArrow.show();
    }
});

function getPrevNext(pokemon, id) {
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .done(data => {
            $(id).show().text(data.name);
        })
        .fail(() => $("#left").hide());
}

let pokemonId;
function afficher(pokemon) {
    const specialNames = {
        king: "blaziken",
        blaziken: "blaziken",
        "the king": "blaziken",
        queen: "mismagius",
        mismagius: "mismagius",
        "the queen": "mismagius",
        429: "mismagius",
        "big man": "blastoise",
        "big man blastoise": "blastoise",
        caratroc: "shuckle",
        shuckle: "shuckle",
        god: "shuckle",
        "the best": "shuckle",
        213: "shuckle",
        slowpoke: "rickroll"
    };
    
    pokemon = specialNames[pokemon] || pokemon || 1;
    $('#lpb').html(pokemon === "rickroll" ? '<a href="https://youtu.be/Ce5mRvkAePU" target="_blank">click! click!</a>' : "");
    
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .done(data => {
            $(".pokemon-info, #left, #right").show();
            
            $('#iconePokemon').attr("src", data.sprites.front_default);
            
            const [primaryType, secondaryType] = data.types.map(t => t.type.name);
            $('#iconeType1Pokemon').attr("src", selectTypeIcon(primaryType)).show();
            
            if (secondaryType) {
                $('#iconeType2Pokemon').attr("src", selectTypeIcon(secondaryType)).show();
            } else {
                $('#iconeType2Pokemon').hide();
            }
            
            $('#nomPokemon').text(data.name);
            $('#poidsPokemon').text(`${data.weight / 10}Kg`);
            $('#idPokemon').text(`ID: ${data.id}`);
            
            pokemonId = data.id;
            getPrevNext(data.id - 1, "#prev");
            getPrevNext(data.id + 1, "#next");
        })
        .fail(() => {
            $(".pokemon-info, #left, #right").hide();
            alert("That Pokémon does NOT exist. Make sure you enter the name in English.");
        });
}


document.getElementById("left").addEventListener("click", precedent);
document.getElementById("right").addEventListener("click", suivant);


function precedent() {
    if (pokemonId > 1) afficher(--pokemonId);
}

function suivant() {
    if (pokemonId < 898) afficher(++pokemonId);
}

// Theme Toggle
$(document).ready(() => {
    const themeToggle = $(".switch input");
    const themeStylesheetId = "blastoise-theme";

    function enableTheme() {
        if (!$(`#${themeStylesheetId}`).length) {
            $("<link>", {
                rel: "stylesheet",
                id: themeStylesheetId,
                href: "css/blastoise.css"
            }).appendTo("head");
        }
        localStorage.setItem("theme", "blastoise");
    }

    function disableTheme() {
        $(`#${themeStylesheetId}`).remove();
        localStorage.setItem("theme", "default");
    }

    if (localStorage.getItem("theme") === "blastoise") {
        enableTheme();
        themeToggle.prop("checked", true);
    }

    themeToggle.on("change", function () {
        this.checked ? enableTheme() : disableTheme();
    });
});
});


