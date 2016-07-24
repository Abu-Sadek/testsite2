/*! Simponi 2015-08-25 17:08 */
function pitcherInit() {}

function hasNotes() {
    var hasNotes = null != $(".notes").html();
    return hasNotes ? "YES" : "NO";
}

function getNotes() {
    return $.trim($(".notes").html().replace(/(<([^>]+)>)/gi, ""));
}

function addVideoListeners() {
    try {
        var myVideo = document.getElementById("embeddedVideo");
        myVideo.addEventListener("playing", sendVideoPlay, !1), myVideo.addEventListener("pause", sendVideoPlay, !1);
    } catch (e) {}
}

function toggleChart() {
    var myVideo = document.getElementById("embeddedVideo");
    null != myVideo && (0 == myVideo.paused ? myVideo.pause() : myVideo.play());
}

function sendVideoPlay() {
    var myVideo = document.getElementById("embeddedVideo");
    0 == myVideo.currentTime && null != videoHotspot && videoHotspot.thirdParameter > 0 && (myVideo.currentTime = videoHotspot.thirdParameter), 
    Ti.App.fireEvent("oPSend");
}

function okPressedFromRemote() {
    try {
        var video = document.getElementById("embeddedVideo");
        return void (0 == video.paused ? video.pause() : video.play());
    } catch (e) {}
    try {
        toggleChart();
    } catch (e) {}
}

function basename(path, suffix) {
    var b = path.replace(/^.*[\/\\]/g, "");
    return "string" == typeof suffix && b.substr(b.length - suffix.length) == suffix && (b = b.substr(0, b.length - suffix.length)), 
    b;
}

function getPageNumber() {
    var currentPage = window.location.href, basenameV = basename(currentPage, ".html"), lastPart = basenameV.replace("slide", ""), pageNumber = parseInt(lastPart);
    return pageNumber;
}

function gup(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)", regex = new RegExp(regexS), results = regex.exec(window.location.href);
    return null == results ? "" : results[1];
}

function showPage(pageURL, title) {
    Ti.App.fireEvent("loadWebPage", {
        urlValue: pageURL,
        title: pageURL,
        showBar: !0,
        allowPortrait: !0
    });
}

function closeModal() {
    Ti.App.fireEvent("closeOpenModal", {});
    
}

function goBack() {
    Ti.App.fireEvent("goBackToLastSlide", {});
}

function closePresentation() {
    Ti.App.fireEvent("closeScrollWeb");
}

function customEvent(eventName) {
    Ti.App.fireEvent("sendStatsFromHTML", {
        event_name: "customPresEvent",
        event_params: eventName,
        event_extra: getPageNumber()
    });
}

function showPDF(filename, title, launchMode, lockMode, references, subFolder, jumpPage, fileID) {
    Ti.App.fireEvent("loadPDF", {
        file: filename,
        titleV: title,
        viewMode: launchMode,
        lockViewMode: lockMode,
        references: null,
        articles: null,
        annotationEnabled: !0,
        subFolder: subFolder,
        jumpToPage: jumpPage - 1,
        pdfID: fileID
    });
}

function load3D(filename, fileID) {
    var folders = filename.split("/");
    0 != folders.length ? Ti.App.fireEvent("loadThreeD", {
        model: folders[1],
        folder: folders[0],
        title: "Pre Treatment CT - Dicom",
        fileID: fileID
    }) : Ti.App.fireEvent("loadThreeD", {
        model: filename,
        title: "Pre Treatment CT - Dicom",
        fileID: fileID
    });
}

function loadMolecule(filename, title, fileID) {
    var folders = filename.split("/");
    0 != folders.length ? Ti.App.fireEvent("loadMolecule", {
        model: folders[1],
        folder: folders[0],
        title: title,
        fileID: fileID
    }) : Ti.App.fireEvent("loadMolecule", {
        model: filename,
        title: title,
        fileID: fileID
    });
}

function showPresentation(ID, subID) {
    Ti.App.fireEvent("launchContentWithID", {
        fileID: ID,
        subID: subID
    });
}

function playVideo(filename, isOnline, fileID) {
    Ti.App.fireEvent("loadMovie", {
        file: filename,
        isOnline: isOnline,
        fileID: fileID
    });
}

function showSurvey(url, title, fileID) {
    Ti.App.fireEvent("loadWebPageFromFolder", {
        urlValue: url.replace(".zip", "").replace("surveys", "") + "/index.html",
        title: title,
        showBar: !0,
        folderName: "surveys",
        allowPortrait: !1,
        fileID: fileID
    });
}

function showZip(url, title, fileID) {
    Ti.App.fireEvent("loadWebPageFromFolder", {
        urlValue: url.replace(".zip", "").replace("zip", "") + "/index.html",
        title: title,
        showBar: !0,
        folderName: "zip",
        allowPortrait: !1,
        fileID: fileID
    });
}

function setCookie(value) {
    Ti.App.fireEvent("setLastPage", {
        p: value
    });
}

function showHotSpots() {
    $(".hotspot").removeClass("visibleHotSpot").addClass("visibleHotSpot"), isPitching = !1;
}

function hideHotSpots() {
    $(".hotspot").removeClass("visibleHotSpot"), isPitching = !0;
}

function showNotes() {
    notesShown ? ($(".notes").hide(), notesShown = !1) : ($(".notes").show(), notesShown = !0);
}

function closeNotes() {
    notesShown = !1, $(".notes").hide();
}

function pitcherCanClose() {
    return !0;
}

var notesShown = !1, isTwoD = !1, isPitching = !1, isAnimated = !1, blockInteraction = !1, hasHotspots = !1;

$(document).ready(function() {
    document.documentElement.style.webkitTapHighlightColor = "rgba(0,0,0,0.0)", pitcherInit();
});

var videoHotspot = null;

!function() {
    window.alert;
    window.alert = function(message, title) {
        null == title && (title = ""), Ti.App.fireEvent("showAlertBox", {
            title: title,
            message: message
        });
    };
}();