const express = require('express');
const fs = require('fs');
const multer = require('multer');
const vCard = require('vcard');
const Contact = require('../models/Contact'); // Your Contact model

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Import Contacts from VCF
router.post('/import', upload.single('file'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the uploaded VCF file
        const vCardData = fs.readFileSync(req.file.path, 'utf8');
        const cards = vCard.parse(vCardData);

        // Loop through the vCards and save them to MongoDB
        for (const card of cards) {
            const contact = new Contact({
                name: card.fn || 'Unnamed', // Handle missing names
                email: card.email || '',
                phone: card.tel || '',
            });
            await contact.save();
        }

        // Optionally delete the uploaded file after processing
        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'Contacts imported successfully' });
    } catch (error) {
        console.error('Error importing contacts:', error);
        res.status(500).json({ error: 'Error importing contacts' });
    }
});

module.exports = router;
