document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    const pokemonInput = $('#pokemon');
    const leftArrow = $('#left');
    const rightArrow = $('#right');
    const typeIcons = ['#iconeType1Pokemon', '#iconeType2Pokemon'];

    // Initialize on page load
    afficher('1');
    leftArrow.show();
    rightArrow.show();

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

    // Function to select the correct icon path for the Pokemon type
    function selectTypeIcon(type) {
        return typeIconPaths[type] || "";
    }

    // Listen for Enter key press and trigger Pokemon search
    pokemonInput.on('keypress', function (e) {
        if (e.key === 'Enter') {
            afficher(pokemonInput.val().toLowerCase());
            leftArrow.show();
            rightArrow.show();
        }
    });

    // Function to fetch previous and next Pokemon
    function getPrevNext(pokemon, id) {
        $.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .done(data => {
                $(id).show().text(data.name);
            })
            .fail(() => $("#left").hide());
    }

    let pokemonId;
    
    // Function to fetch and display information about a Pokemon
    function afficher(pokemon) {
        $('#lpb').text("");
        // Handle special names using switch
        switch (pokemon) {
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
            case "blastoise":
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

    // Event listeners for the left and right arrows
    document.getElementById("left").addEventListener("click", precedent);
    document.getElementById("right").addEventListener("click", suivant);

    // Function for previous Pokemon
    function precedent() {
        if (pokemonId > 1) afficher(--pokemonId);
    }

    // Function for next Pokemon
    function suivant() {
        if (pokemonId < 898) afficher(++pokemonId);
    }

    // Theme Toggle functionality
    const themeToggle = $(".switch input");
    const themeStylesheetId = "blastoise-theme";

    // Enable theme function
    function enableTheme() {
        if (!$(`#${themeStylesheetId}`).length) {
            $("<link>", {
                rel: "stylesheet",
                id: themeStylesheetId,
                href: "CSS/blastoise.css"  
            }).appendTo("head");
        }
        localStorage.setItem("theme", "blastoise");
    }

    // Disable theme function
    function disableTheme() {
        $(`#${themeStylesheetId}`).remove();
        localStorage.setItem("theme", "default");
    }

    // Check localStorage for saved theme
    if (localStorage.getItem("theme") === "blastoise") {
        enableTheme();
        themeToggle.prop("checked", true);
    }

    // Handle theme toggle change
    themeToggle.on("change", function () {
        this.checked ? enableTheme() : disableTheme();
    });
});
