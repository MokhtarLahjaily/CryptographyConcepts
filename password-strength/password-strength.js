class PasswordStrengthChecker {
    constructor() {
        this.minLength = 8;
        this.requireUppercase = true;
        this.requireLowercase = true;
        this.requireNumbers = true;
        this.requireSpecialChars = true;
    }

    checkStrength(password) {
        const results = {
            isStrong: true,
            issues: [],
            score: 0
        };

        // Check length
        if (password.length < this.minLength) {
            results.issues.push(`Password must be at least ${this.minLength} characters long`);
            results.isStrong = false;
        } else {
            results.score += 1;
        }

        // Check for uppercase
        if (this.requireUppercase && !/[A-Z]/.test(password)) {
            results.issues.push('Password must contain at least one uppercase letter');
            results.isStrong = false;
        } else if (this.requireUppercase) {
            results.score += 1;
        }

        // Check for lowercase
        if (this.requireLowercase && !/[a-z]/.test(password)) {
            results.issues.push('Password must contain at least one lowercase letter');
            results.isStrong = false;
        } else if (this.requireLowercase) {
            results.score += 1;
        }

        // Check for numbers
        if (this.requireNumbers && !/\d/.test(password)) {
            results.issues.push('Password must contain at least one number');
            results.isStrong = false;
        } else if (this.requireNumbers) {
            results.score += 1;
        }

        // Check for special characters
        if (this.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            results.issues.push('Password must contain at least one special character');
            results.isStrong = false;
        } else if (this.requireSpecialChars) {
            results.score += 1;
        }

        // Check for common patterns
        const commonPatterns = ['password', '123456', 'qwerty', 'admin'];
        if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
            results.issues.push('Password contains common patterns');
            results.isStrong = false;
            results.score -= 1;
        }

        // Calculate entropy
        const entropy = this.calculateEntropy(password);
        results.entropy = entropy;
        if (entropy < 3) {
            results.issues.push('Password has low entropy (too predictable)');
            results.isStrong = false;
        } else {
            results.score += 1;
        }

        return results;
    }

    calculateEntropy(password) {
        const charSet = new Set(password.split('')).size;
        const length = password.length;
        return Math.log2(Math.pow(charSet, length));
    }
}

// Example usage
const checker = new PasswordStrengthChecker();

const testPasswords = [
    'weak',
    'Password123',
    'StrongP@ssw0rd',
    'qwerty123',
    'P@ssw0rd!2024'
];

console.log('Password Strength Analysis:\n');
testPasswords.forEach(password => {
    const result = checker.checkStrength(password);
    console.log(`Password: ${password}`);
    console.log(`Strength Score: ${result.score}/6`);
    console.log(`Entropy: ${result.entropy.toFixed(2)}`);
    console.log(`Is Strong: ${result.isStrong}`);
    if (result.issues.length > 0) {
        console.log('Issues:');
        result.issues.forEach(issue => console.log(`- ${issue}`));
    }
    console.log('-------------------\n');
}); 