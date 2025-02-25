document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("killShrek");
    let video = document.getElementById("shrekVideo");
    let content = document.getElementById("content");

    button.addEventListener("click", function () {
        content.style.display = "none"; // Remove all text & images
        button.style.display = "none"; // Remove the button
        video.style.display = "block"; // Show the video
        video.play(); // Play video automatically

        // Send request to backend to record button press
        fetch('/kill-shrek', { method: 'POST' })
            .then(response => response.json())
            .then(data => console.log(`Shrek has been ended ${data.count} times.`))
            .catch(error => console.error('Error:', error));
    });

    // Fetch current count when page loads
    fetch('/shrek-count')
        .then(response => response.json())
        .then(data => console.log(`Shrek has been ended ${data.count} times.`))
        .catch(error => console.error('Error:', error));
});
