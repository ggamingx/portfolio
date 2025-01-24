const fs = require('fs');
const path = require('path');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../database/images'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
});

const upload = multer({storage: fileStorageEngine});

function loadData(datafile) {
    try {
        const dataBuffer = fs.readFileSync(datafile, 'utf8');
        const data = JSON.parse(dataBuffer);

        return Array.isArray(data) ? data : [];
    } catch (err) {
        return [];
    }
}

function saveData(data, datafile) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(datafile, jsonData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('saved data successfully')
        }
    });
}

module.exports = { loadData, saveData, upload };