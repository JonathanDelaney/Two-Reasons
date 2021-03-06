//////////// Interval Constants

const dayStep = 86400000;
const weekStep = 604800000;
const monthStep = 2654848607;
const tmonthStep = 7964545823;
const smonthStep = 15929091646;


//////////// War Date Constants & Variables

const ww1StartMsec = 1749252879000;
const ww1LengthMsec = 143361824814;
const ww2StartMsec = 973244691646;
const ww2LengthMsec = 207132291646;
let sliderStartMsec;
let wwLengthMsec;


//////////// Map Constants & Variables

let overview;
let map;
let markedLocations = [];
const OVERVIEW_DIFFERENCE = 5;
const OVERVIEW_MIN_ZOOM = 1;
const OVERVIEW_MAX_ZOOM = 3.5;
let mapCenter = { lat: 28, lng: 12 };
let locations = [];


//////////// Slider Variables

let slider = document.getElementById("slider");
let year = document.getElementById("year");


//////////// Map & Page Initialisation

function initMapWithMarkers() {
    initMap();
    sliderMapChange();
}

let initContent = (function () {
    let executed = false;
    return function () {
        if (!executed) {
            executed = true;
            $(".init-page-container").removeClass("init-page-container").addClass("page-container");
            $(".intro").css({ "height": "0px", "transform": "scale(0)", "opacity": "0%" });
            $(".key").css({ "height": "800px", "transform": "scale(1)" });
            $(".map-button-container").css("visibility", "visible");
            $("#buttonsNMap").addClass("map-button-container").removeClass("init-map-button-container");
            $(".contact-link").css({ 'opacity': '100%', 'transform': 'scale(1)' });
            setTimeout(initMapWithMarkers, 1000);
        }
    };
})();


//////////// World War Globes

$(".ww1").click(function () {
    $("#startHeading").html("<h3>1914</h3>");
    $("#endHeading").html("<h3>1919</h3>");
    $("#slider").attr("max", ww1LengthMsec);
    sliderStartMsec = ww1StartMsec;
    wwLengthMsec = ww1LengthMsec;
    if ($(".ww1").hasClass('world-highlighted')) {
        return;
    } else {
        $(".ww2").removeClass('world-highlighted');
        $(".ww1").addClass('world-highlighted');
    }
    sliderMapChange();
    initContent();
    insertAptKey("ww1");
});

$(".ww2").click(function () {
    $("#startHeading").html("<h3>1939</h3>");
    $("#endHeading").html("<h3>1945</h3>");
    $("#slider").attr("max", ww2LengthMsec);
    sliderStartMsec = ww2StartMsec;
    wwLengthMsec = ww2LengthMsec;
    if ($(".ww2").hasClass('world-highlighted')) {
        return;
    } else {
        $(".ww1").removeClass('world-highlighted');
        $(".ww2").addClass('world-highlighted');
    }
    sliderMapChange();
    initContent();
    insertAptKey("ww2");
});


//////////// Interval Buttons

$("#day").click(function () {
    $("#slider").attr("step", dayStep);
    sliderMapChange();
});

$("#week").click(function () {
    $("#slider").attr("step", weekStep);
    sliderMapChange();
});

$("#month").click(function () {
    $("#slider").attr("step", monthStep);
    sliderMapChange();
});

$("#tmonth").click(function () {
    $("#slider").attr("step", tmonthStep);
    sliderMapChange();
});

$("#smonth").click(function () {
    $("#slider").attr("step", smonthStep);
    sliderMapChange();
});

$("#wholeWar").click(function () {
    $("#slider").attr("step", 1000000000000);
    sliderMapChange();
    if ($(this).hasClass('highlighted')) {
        return;
    } else {
        $('.highlighted').removeClass('highlighted');
        $("#slider").css('filter', 'brightness(20%)');
        $(".interval-dates").css('filter', 'brightness(20%)');
        $(this).addClass('highlighted');
    }
});

$(".period-button").click(function () {
    let clicked = $(this);

    if (clicked.hasClass('highlighted')) {
        return;
    } else {
        $('.highlighted').removeClass('highlighted');
        $(this).addClass('highlighted');
        $("#slider").css('filter', 'brightness(100%)');
        $(".interval-dates").css('filter', 'brightness(100%)');
    }
});


//////////// Slider Actions

$("#slider").on('input', function () {
    sliderMapChange();
});

$("#slider").on('mousedown', function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".interval-dates").offset().top
    }, 500);
    $("#slider").css('cursor', 'grabbing !important');
});

$("#slider").on('mouseup', function () {
    $("#slider").css('cursor', 'grab');
});


//////////// Key Togggle

function insertAptKey(war) {
    $("li img").css("transform", "scale(0)");
    $(".insert > img").remove();
    if (war == "ww1") {
        $("<img src='assets/cluster_images/mGround.png'>").prependTo(".key-ground");
        $("<img src='assets/cluster_images/mAerial.png'>").prependTo(".key-aerial");
        $("<img src='assets/cluster_images/mNaval.png'>").prependTo(".key-naval");
        $("<img src='assets/cluster_images/mBombing.png'>").prependTo(".key-bombing");
        $("<img src='assets/cluster_images/mAerial-Ground-Naval.png'>").prependTo(".key-combo");
        $(".interval-dates").html("<h3>|</h3><h3>1915</h3><h3>|</h3><h3>1916</h3><h3>|</h3><h3>1917</h3><h3>|</h3><h3>1918</h3><h3>|</h3>");
        $(".interval-dates").css("margin-left", "7%");
        $(".interval-dates").css("width", "90%");
    } else {
        $("<img src='assets/cluster_images/mww2Ground.png'>").prependTo(".key-ground");
        $("<img src='assets/cluster_images/mww2Aerial.png'>").prependTo(".key-aerial");
        $("<img src='assets/cluster_images/mww2Naval.png'>").prependTo(".key-naval");
        $("<img src='assets/cluster_images/mww2Bombing.png'>").prependTo(".key-bombing");
        $("<img src='assets/cluster_images/mww2Aerial-Ground-Naval.png'>").prependTo(".key-combo");
        $(".interval-dates").html("<h3>|</h3><h3>1940</h3><h3>|</h3><h3>1941</h3><h3>|</h3><h3>1942</h3><h3>|</h3><h3>1943</h3><h3>|</h3><h3>1944</h3><h3>|</h3>");
        $(".interval-dates").css("margin-left", "5%");
        $(".interval-dates").css("width", "70%");
    }
    $("li img").css("transform", "scale(1)");
}


//////////// Map Rendering on Slider Input

function sliderMapChange() {
    let sliderDif = parseInt(slider.value);
    let dateShown = (sliderStartMsec - sliderDif) * (-1);
    let longDate = new Date(dateShown);
    let longDateStr = JSON.stringify(longDate);
    let shortDate = longDateStr.slice(1, 11);
    year.textContent = shortDate;

    //////////// Loop to Select Which Battles to Plot

    if ($("#slider").attr("step") == dayStep) {
        for (i = 0; i < wws.length; i++) {
            let startMsec = Date.parse(wws[i].startDate);
            let endMsec = Date.parse(wws[i].endDate);
            if (dateShown >= startMsec && dateShown <= endMsec) {
                locations.push(wws[i].coords);
            }
        }
    } else if ($("#slider").attr("step") == weekStep) {
        for (i = 0; i < wws.length; i++) {
            let startMsec = Date.parse(wws[i].startDate) - 302400000;
            let endMsec = Date.parse(wws[i].endDate) + 302400000;
            if (dateShown >= startMsec && dateShown <= endMsec) {
                locations.push(wws[i].coords);
            }
        }
    } else if ($("#slider").attr("step") == monthStep) {
        for (i = 0; i < wws.length; i++) {
            let startMsec = Date.parse(wws[i].startDate) - 1314000000;
            let endMsec = Date.parse(wws[i].endDate) + 1314000000;
            if (dateShown >= startMsec && dateShown <= endMsec) {
                locations.push(wws[i].coords);
            }
        }
    } else if ($("#slider").attr("step") == tmonthStep) {
        for (i = 0; i < wws.length; i++) {
            let startMsec = Date.parse(wws[i].startDate) - 3942000000;
            let endMsec = Date.parse(wws[i].endDate) + 3942000000;
            if (dateShown >= startMsec && dateShown <= endMsec) {
                locations.push(wws[i].coords);
            }
        }
    } else if ($("#slider").attr("step") == smonthStep) {
        for (i = 0; i < wws.length; i++) {
            let startMsec = Date.parse(wws[i].startDate) - 7964545823;
            let endMsec = Date.parse(wws[i].endDate) + 7964545823;
            if (dateShown >= startMsec && dateShown <= endMsec) {
                locations.push(wws[i].coords);
            }
        }
    } else {
        for (i = 0; i < wws.length; i++) {
            let startMsec = Date.parse(wws[i].startDate);
            let endMsec = Date.parse(wws[i].endDate);
            let wwStartMsec = (sliderStartMsec) * (-1);
            let wwEndMsec = wwStartMsec + wwLengthMsec;
            if (wwStartMsec <= startMsec && wwEndMsec >= endMsec) {
                locations.push(wws[i].coords);
            }
        }
    }

    //////////// Removes Current Markers, Sets New Markers Down, Centers Map, Then Empties Array For Next Run
    removeMarkers();
    setMarkers();
    map.setCenter(mapCenter);
    map.setZoom(2.47);

    locations = [];
}


//////////// Button ReCentering Map

function CenterControl(controlDiv, map) {
    // Sets CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);
    // Sets CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "Center Map";
    controlUI.appendChild(controlText);
    // Sets the click event listener to Center
    controlUI.addEventListener("click", () => {
        map.setCenter(mapCenter);
        map.setZoom(2.47);
    });
}


//////////// Function to Initialise Map

function initMap() {
    const styledMapType = new google.maps.StyledMapType(
        [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#afa27e" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#92998d" }],
            },
        ],
        { name: "Old War Style" }
    );

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2.47,
        center: mapCenter,
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        streetViewControl: false,
        scaleControl: false,
        fullscreenControl: false,
    });
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    const centerControlDiv = document.createElement("div");
    CenterControl(centerControlDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    // instantiate the overview map without controls
    overview = new google.maps.Map(document.getElementById("overview"), {
        center: { lat: 20.047867, lng: 12.898272 },
        zoom: 1.5,
        disableDefaultUI: true,
        gestureHandling: "none",
        zoomControl: false,
    });

    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    map.addListener("bounds_changed", () => {
        overview.setCenter(map.getCenter());
        overview.setZoom(
            clamp(
                map.getZoom() - OVERVIEW_DIFFERENCE,
                OVERVIEW_MIN_ZOOM,
                OVERVIEW_MAX_ZOOM
            )
        );
    });

    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");
    overview.mapTypes.set("styled_map", styledMapType);
    overview.setMapTypeId("styled_map");
}


//////////// Remove All Markers

function removeMarkers() {

    (markerRemoval = function () {
        for (let i = 0; i < markedLocations.length; i++) {
            markedLocations[i].setMap(null);
        }
    })();

    markedLocations = [];
}


//////////// Place Markers Down

function setMarkers() {

    let markers = locations.map(function (location, i) {

        //////////// Extracting Data from Relevant Object
        const startDate = wws.find(x => x.coords === location).startDate;
        const startDateMsec = Date.parse(startDate) * (-1);
        let battleType = wws.find(x => x.coords === location).battleType;
        const battleTitle = wws.find(x => x.coords === location).battle;
        let battleImageType;
        let battleImageSort;

        //////////// Sorting Battle Titles Into Usable Strings
        if (startDateMsec > ww2StartMsec) {
            if (typeof battleType == 'string') {
                battleImageType = battleType;
            } else {
                battleType = battleType.sort();
                battleTypeStr = battleType.toString();
                battleImageType = battleTypeStr.replace(/,/g, '-');
            }
        } else {
            if (typeof battleType == 'string') {
                battleImageType = "ww2" + battleType;
            } else {
                battleType = battleType.sort();
                battleTypeStr = battleType.toString();
                battleImageSort = battleTypeStr.replace(/,/g, '-');
                battleImageType = "ww2" + battleImageSort;
            }
        }

        const infowindow = new google.maps.InfoWindow({
            content: battleTitle,
        });

        const image =
        {
            url: "assets/cluster_images/m" + battleImageType + ".png",
            scaledSize: new google.maps.Size(40, 40),
        };

        const marker = new google.maps.Marker({
            position: location,
            icon: image,
            map,
        });
        markedLocations.push(marker);

        //////////// Marker Events
        marker.addListener("mouseover", () => {
            infowindow.open(map, marker);
        });

        marker.addListener("mouseout", () => {
            infowindow.close();
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
            map.setZoom(11);
            map.setCenter(marker.getPosition());
            battleInfoDiv(battleTitle, startDate);
            setTimeout(function () { infowindow.close(); }, 3000);
        });
        return marker;
    });
}


///////////////// Responsiveness on viewport change if marker has been clicked already
let respV = false;

$(window).resize(function () {
    if (respV == true) {
        if ($(window).width() < 300) {
            $(".page-container").css({ "height": "893vw", "max-height": "2500px" });
            $(".key").css("margin-top", "-45vw");
            $(".map-button-container").css("margin-top", "-50vw");
        } else if ($(window).height() > 800 && $(window).width() < 450) {
            $(".page-container").css({ "height": "742vw", "max-height": "2534px" });
            $(".key").css("margin-top", "-97vw");
            $(".map-button-container").css("margin-top", "-133vw");
        } else if ($(window).width() <= 700) {
            $(".page-container").css({ "height": "742vw", "max-height": "2400px" });
            $(".key").css("margin-top", "-45vw");
            $(".map-button-container").css("margin-top", "-50vw");
        } else if ($(window).width() > 2000) {
            $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "3225px" });
            $(".key").css("margin-top", "-45vw");
            $(".map-button-container").css("margin-top", "-50vw");
        } else if ($(window).width() > 1400 && $(window).width() < 2000) {
            $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "2850px" });
            $(".key").css("margin-top", "-45vw");
            $(".map-button-container").css("margin-top", "-50vw");
        } else if ($(window).width() > 700 && $(window).height() < 730) {
            $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "3000px" });
            $(".key").css("margin-top", "0vw");
            $(".map-button-container").css("margin-top", "0vw");
        } else if ($(window).width() > 700 && $(window).width() < 1025) {
            $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "3000px" });
            $(".key").css("margin-top", "-145vw");
            $(".map-button-container").css("margin-top", "-145vw");
        } else if ($(window).width() > 700) {
            $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "2625px" });
            $(".key").css("margin-top", "-45vw");
            $(".map-button-container").css("margin-top", "-50vw");
        } else {
            $(".page-container").css("height", "calc(170vh + 1400px)");
        }
    }
});


//////////// Battle Info Box Creator

function battleInfoDiv(battleTitle, startDate) {

    respV = true;

    //////////// Extracting More Data from Relevant Object
    const endDate = wws.find(x => x.battle === battleTitle).endDate;
    const description = wws.find(x => x.battle === battleTitle).description;
    const allies = wws.find(x => x.battle === battleTitle).allies;
    const adversaries = wws.find(x => x.battle === battleTitle).adversaries;
    const titleLink = battleTitle.replace(/ /g, '_');
    const wikiLink = "https://en.wikipedia.org/wiki/" + titleLink;
    let alliesL;
    let adversL;
    let alliesR;
    let adverseR;

    //////////// Changing Screen Height Property Depending on Current Screen Layout
    if ($(window).width() < 300) {
        $(".page-container").css({ "height": "893vw", "max-height": "2500px" });
        $(".key").css("margin-top", "-45vw");
        $(".map-button-container").css("margin-top", "-50vw");
    } else if ($(window).height() > 800 && $(window).width() < 450) {
        $(".page-container").css({ "height": "742vw", "max-height": "2534px" });
        $(".key").css("margin-top", "-97vw");
        $(".map-button-container").css("margin-top", "-133vw");
    } else if ($(window).width() <= 700) {
        $(".page-container").css({ "height": "742vw", "max-height": "2400px" });
        $(".key").css("margin-top", "-45vw");
        $(".map-button-container").css("margin-top", "-50vw");
    } else if ($(window).width() > 2000) {
        $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "3225px" });
        $(".key").css("margin-top", "-45vw");
        $(".map-button-container").css("margin-top", "-50vw");
    } else if ($(window).width() > 1400 && $(window).width() < 2000) {
        $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "2850px" });
        $(".key").css("margin-top", "-45vw");
        $(".map-button-container").css("margin-top", "-50vw");
    } else if ($(window).width() > 700 && $(window).height() < 800) {
        $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "3000px" });
        $(".key").css("margin-top", "0vw");
        $(".map-button-container").css("margin-top", "0vw");
    } else if ($(window).width() > 700 && $(window).width() < 1025) {
        $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "3000px" });
        $(".key").css("margin-top", "-145vw");
        $(".map-button-container").css("margin-top", "-145vw");
    } else if ($(window).width() > 700) {
        $(".page-container").css({ "height": "calc(170vh + 1400px)", "max-height": "2625px" });
        $(".key").css("margin-top", "-45vw");
        $(".map-button-container").css("margin-top", "-50vw");
    } else {
        $(".page-container").css("height", "calc(170vh + 1400px)");
    }
    $(".page-container").css("transition", "none");

    //////////// Preparing Ally And Adversary Strings
    if (typeof allies == 'object') {
        let aLen = allies.length;
        aLen > 11 ? aLen = 11 : aLen;
        alliesL = allies.slice(0, aLen).toString();
        alliesR = alliesL.replace(/,/g, ', ');
    } else {
        alliesR = allies;
    }
    if (typeof adversaries == 'object') {
        let aLen = adversaries.length;
        aLen > 11 ? aLen = 11 : aLen;
        adversL = adversaries.slice(0, aLen).toString();
        adverseR = adversL.replace(/,/g, ', ')
    } else {
        adverseR = adversaries;
    }

    //////////// Loading A Table With All The Battle Info
    $("#battleInfoBox").html(
        "<div class='fFlagsNpole'><div class='flagpole friendly-flagpole'></div><div class='flags fFlags' id='friendly-flags'></div></div>" +
        "<table class='infoBoxTable'>" +
        "<tr>" +
        "<th colspan='2' class='battle-title'><a href='" + wikiLink + "' target='_blank'><img src='assets/flag_images/wikipedia.png'><h1>" + battleTitle + "</h1></a></th>" +
        "</tr>" +
        "<tr>" +
        "<td>Start Date: " + startDate + "</td>" +
        "<td>End Date: " + endDate + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Allies: " + alliesR + "</td>" +
        "<td>Antagonists: " + adverseR + "</td>" +
        "</tr>" +
        "<tr>" +
        "<th colspan='2'><p class='battle-description'>" + description + "</p></th>" +
        "</tr>" +
        "</table>" +
        "<div class='eFlagsNpole'><div class='flags eFlags' id='enemy-flags'></div><div class='flagpole enemy-flagpole'></div></div>"
    );

    //////////// Calling Flag Images for Each of the Allies And Adversaries
    let enemyFlags = document.getElementById("enemy-flags");
    let friendlyFlags = document.getElementById("friendly-flags");
    if (typeof allies == 'object') {
        let aLen = allies.length;
        aLen > 11 ? aLen = 11 : aLen;
        for (i = 0; i < aLen; i++) {
            let lilAllies = allies[i].toLowerCase();
            let aArranged = lilAllies.replace(/ /g, '_');
            friendlyFlags.innerHTML += "<img src='assets/flag_images/" + aArranged + ".png' alt='allied flag'></img>";
        }
    } else {
        let lilAlly = allies.toLowerCase();
        let aArranged = lilAlly.replace(/ /g, '_');
        $("#friendly-flags").html("<img src='assets/flag_images/" + aArranged + ".png' alt='enemy flag'></img>");
    }
    if (typeof adversaries == 'object') {
        let eLen = adversaries.length;
        for (i = 0; i < eLen; i++) {
            let lilEnemies = adversaries[i].toLowerCase();
            let eArranged = lilEnemies.replace(/ /g, '_');
            enemyFlags.innerHTML += "<img src='assets/flag_images/" + eArranged + ".png'></img>";
        }
    } else {
        let lilEnemy = adversaries.toLowerCase();
        let eArranged = lilEnemy.replace(/ /g, '_');
        $("#enemy-flags").html("<img src='assets/flag_images/" + eArranged + ".png'></img>");
    }

    //////////// Auto Scroll to Info Box
    setTimeout(function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth"
        });
    }, 1);
}