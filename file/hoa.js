function startSite() {
    var audio = document.getElementById('audio');
    var body = document.body;
    var overlay = document.getElementById('overlay');
    console.log("Hello")
    // Hide the overlay
    overlay.style.display = 'none';
    var elementsToShow = document.querySelectorAll('body > :not(#overlay)');
    elementsToShow.forEach(function(element) {
        element.style.display = 'block'; // Show all elements except #overlay
    });
    audio.play();
    
}
