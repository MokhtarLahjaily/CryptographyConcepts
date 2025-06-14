const bcrypt = require('bcrypt');

/**
 * Hash a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} The hashed password
 */
async function hashPassword(password) {
    try {
        // Generate a salt with 10 rounds (higher is more secure but slower)
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

/**
 * Verify a password against a hash
 * @param {string} password - The password to verify
 * @param {string} hash - The hash to compare against
 * @returns {Promise<boolean>} Whether the password matches the hash
 */
async function verifyPassword(password, hash) {
    try {
        // Use constant-time comparison to prevent timing attacks
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Failed to verify password');
    }
}

// Example usage
async function main() {
    try {
        const password = 'hi-mom!';
        
        // Hash the password
        console.log('Original password:', password);
        const hashedPassword = await hashPassword(password);
        console.log('Hashed password:', hashedPassword);
        
        // Verify the password
        const isMatch = await verifyPassword(password, hashedPassword);
        console.log(isMatch ? '✔️  Password verified successfully' : '❌  Password verification failed');
        
        // Try with wrong password
        const wrongPassword = 'wrong-password';
        const isWrongMatch = await verifyPassword(wrongPassword, hashedPassword);
        console.log('Trying wrong password:', wrongPassword);
        console.log(isWrongMatch ? '✔️  Password verified successfully' : '❌  Password verification failed');
    } catch (error) {
        console.error('Error in main:', error);
    }
}

// Run the example
main();