function bruteForceCrack(targetPassword) {
    let i = 0;
    const totalAttempts = 10000;
    
    const progressBar = document.getElementById("progress-bar");
    const statusText = document.getElementById("status");

    const interval = setInterval(() => {
        if (i >= totalAttempts) {
            clearInterval(interval);
            statusText.textContent = "Password not found (this shouldn't happen with a 4-digit number).";
            progressBar.style.width = '100%'; // Ensure the progress bar is filled to 100% after all attempts
            return;
        }
        
        let attempt = i.toString().padStart(4, '0');
        const progress = Math.floor((i / totalAttempts) * 100);
        progressBar.style.width = `${progress}%`; // Update the progress bar gradually

        // Visualize the matching digits in the UI
        let matchVisual = attempt.split('').map((digit, index) => {
            return digit === targetPassword[index] ? 
                `<span style="color: green">${digit}</span>` : 
                `<span style="color: red">${digit}</span>`;
        }).join('');

        statusText.innerHTML = `Cracking: ${matchVisual}`;
        
        if (attempt === targetPassword) {
            clearInterval(interval);
            statusText.innerHTML = `Password cracked! The password is: <strong>${attempt}</strong>`;
            // Continue updating the progress bar until it reaches 100%
            progressBar.style.width = '100%';
        }
        
        i++;
    }, 10); // Adjust the speed of brute-forcing (lower for faster, higher for slower)
}

document.getElementById("startButton").addEventListener("click", function() {
    const targetPassword = document.getElementById("targetPassword").value;

    // Validate input: 4-digit number
    if (!/^\d{4}$/.test(targetPassword)) {
        alert("Please enter a valid 4-digit password.");
        return;
    }

    // Start brute-forcing the password
    document.getElementById("status").textContent = "Starting brute force attack...";
    bruteForceCrack(targetPassword);
});
