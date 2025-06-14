const crypto = require('crypto');

class SecureRandom {
    constructor() {
        this.entropyPool = Buffer.alloc(0);
    }

    // Generate a secure random number between min and max (inclusive)
    getRandomInt(min, max) {
        const range = max - min + 1;
        const bytesNeeded = Math.ceil(Math.log2(range) / 8);
        const maxNum = Math.pow(256, bytesNeeded);
        const maxRange = maxNum - (maxNum % range);

        let randomNum;
        do {
            randomNum = parseInt(crypto.randomBytes(bytesNeeded).toString('hex'), 16);
        } while (randomNum >= maxRange);

        return min + (randomNum % range);
    }

    // Generate a secure random string of specified length
    getRandomString(length, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
        let result = '';
        const charsetLength = charset.length;

        for (let i = 0; i < length; i++) {
            const randomIndex = this.getRandomInt(0, charsetLength - 1);
            result += charset[randomIndex];
        }

        return result;
    }

    // Generate a secure random bytes buffer
    getRandomBytes(length) {
        return crypto.randomBytes(length);
    }

    // Generate a secure random UUID (v4)
    getRandomUUID() {
        return crypto.randomUUID();
    }

    // Add entropy to the pool
    addEntropy(data) {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        this.entropyPool = Buffer.concat([this.entropyPool, hash.digest()]);
    }

    // Get entropy from the pool
    getEntropy(length) {
        if (this.entropyPool.length < length) {
            throw new Error('Not enough entropy in the pool');
        }
        const entropy = this.entropyPool.slice(0, length);
        this.entropyPool = this.entropyPool.slice(length);
        return entropy;
    }
}

// Example usage
const secureRandom = new SecureRandom();

console.log('Secure Random Number Generation Examples\n');

// Generate random integers
console.log('Random Integers:');
for (let i = 0; i < 5; i++) {
    console.log(`Random number between 1 and 100: ${secureRandom.getRandomInt(1, 100)}`);
}

// Generate random strings
console.log('\nRandom Strings:');
console.log('Random string (10 chars):', secureRandom.getRandomString(10));
console.log('Random string (20 chars):', secureRandom.getRandomString(20));
console.log('Random hex string (16 chars):', secureRandom.getRandomString(16, '0123456789ABCDEF'));

// Generate random bytes
console.log('\nRandom Bytes:');
console.log('16 random bytes:', secureRandom.getRandomBytes(16).toString('hex'));
console.log('32 random bytes:', secureRandom.getRandomBytes(32).toString('hex'));

// Generate UUIDs
console.log('\nRandom UUIDs:');
console.log('UUID 1:', secureRandom.getRandomUUID());
console.log('UUID 2:', secureRandom.getRandomUUID());

// Entropy pool example
console.log('\nEntropy Pool Example:');
secureRandom.addEntropy('Some random data');
secureRandom.addEntropy('More random data');
console.log('Entropy from pool:', secureRandom.getEntropy(32).toString('hex'));

// Demonstrate statistical distribution
console.log('\nStatistical Distribution Test:');
const distribution = new Array(10).fill(0);
const samples = 10000;

for (let i = 0; i < samples; i++) {
    const num = secureRandom.getRandomInt(0, 9);
    distribution[num]++;
}

console.log('Distribution of 10,000 random numbers (0-9):');
distribution.forEach((count, index) => {
    const percentage = (count / samples * 100).toFixed(1);
    console.log(`${index}: ${count} (${percentage}%)`);
}); 