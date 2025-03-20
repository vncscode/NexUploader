const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


const MAX_SIZE_MB = 60; 
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const UPLOAD_LIMIT = 6; 
const TIME_WINDOW = 60 * 1000; 

let uploadCount = 0;
let lastReset = Date.now();


function resetCounter() {
    const now = Date.now();
    if (now - lastReset >= TIME_WINDOW) {
        uploadCount = 0;
        lastReset = now;
    }
}


async function uploadFile(filePath) {
    resetCounter();

    if (uploadCount >= UPLOAD_LIMIT) {
        throw new Error('❌ Limite de 6 uploads por minuto atingido. Tente novamente depois.');
    }

    try {
    
        const fileStats = fs.statSync(filePath);
        if (fileStats.size > MAX_SIZE_BYTES) {
            throw new Error(`❌ O arquivo excede o limite de ${MAX_SIZE_MB}MB. Tamanho: ${(fileStats.size / (1024 * 1024)).toFixed(2)}MB`);
        }

       
        const formData = new FormData();
        formData.append('files[]', fs.createReadStream(filePath), path.basename(filePath));

    
        const response = await axios.post('https://storage.nexfuture.com.br/upload', formData, {
            headers: {
                ...formData.getHeaders()
            },
            maxBodyLength: Infinity
        });

        uploadCount++;

        return {
            success: true,
            data: response.data.resultado
        };

    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}

module.exports = uploadFile;
