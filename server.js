const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Store pending announcements
let pendingAnnouncements = [];

// Website sends messages here
app.post('/send-announcement', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.json({ success: false, error: 'No message provided' });
    }
    
    // Add to pending announcements
    pendingAnnouncements.push({
        message: message,
        timestamp: Date.now(),
        id: Math.random().toString(36).substr(2, 9)
    });
    
    console.log(`New announcement: "${message}"`);
    res.json({ success: true, message: 'Announcement queued' });
});

// Roblox game checks for new messages here
app.get('/get-announcements', (req, res) => {
    // Return all pending announcements
    res.json({ announcements: pendingAnnouncements });
    
    // Clear pending announcements after sending
    pendingAnnouncements = [];
});

app.listen(3000, () => {
    console.log('Website server running on http://localhost:3000');
    console.log('Ready to receive announcements!');
});