const crypto = require('crypto');

class DiffieHellman {
    constructor(prime = null, generator = null) {
        if (prime && generator) {
            this.dh = crypto.createDiffieHellman(Buffer.from(prime, 'hex'), Buffer.from(generator, 'hex'));
        } else {
            this.dh = crypto.createDiffieHellman(2048);
        }
        this.dh.generateKeys();
    }

    getPublicKey() {
        return this.dh.getPublicKey('hex');
    }

    getPrivateKey() {
        return this.dh.getPrivateKey('hex');
    }

    computeSecret(theirPublicKey) {
        return this.dh.computeSecret(Buffer.from(theirPublicKey, 'hex'));
    }

    getPrime() {
        return this.dh.getPrime('hex');
    }

    getGenerator() {
        return this.dh.getGenerator('hex');
    }
}

// Simulate two parties (Alice and Bob) performing key exchange
console.log('Diffie-Hellman Key Exchange Simulation\n');

// Alice's side
console.log('Alice:');
const alice = new DiffieHellman();
console.log('Generated private key:', alice.getPrivateKey());
console.log('Generated public key:', alice.getPublicKey());
console.log('Prime:', alice.getPrime());
console.log('Generator:', alice.getGenerator());

// Bob's side uses Alice's prime and generator
console.log('\nBob:');
const bob = new DiffieHellman(alice.getPrime(), alice.getGenerator());
console.log('Generated private key:', bob.getPrivateKey());
console.log('Generated public key:', bob.getPublicKey());

// Key exchange
console.log('\nPerforming key exchange...');

// Alice computes the shared secret using Bob's public key
const aliceSecret = alice.computeSecret(bob.getPublicKey());
console.log('\nAlice computed shared secret:', aliceSecret.toString('hex'));

// Bob computes the shared secret using Alice's public key
const bobSecret = bob.computeSecret(alice.getPublicKey());
console.log('Bob computed shared secret:', bobSecret.toString('hex'));

// Verify that both parties have the same shared secret
console.log('\nVerification:');
console.log('Shared secrets match:', aliceSecret.equals(bobSecret));

// Use the first 32 bytes of the shared secret for AES-256-GCM
const key = aliceSecret.slice(0, 32);
const message = 'Hello, this is a secret message!';
const iv = crypto.randomBytes(16);

// Alice encrypts the message
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
let encrypted = cipher.update(message, 'utf8', 'hex');
encrypted += cipher.final('hex');
const authTag = cipher.getAuthTag();

console.log('\nUsing shared secret for symmetric encryption:');
console.log('Original message:', message);
console.log('Encrypted message:', encrypted);

// Bob decrypts the message
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(authTag);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('Decrypted message:', decrypted);
console.log('Decryption successful:', decrypted === message); 