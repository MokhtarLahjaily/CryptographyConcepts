# Cryptography Concepts

This repository contains examples of various cryptography concepts implemented in JavaScript using Node.js.

## Concepts Covered

- **Hash**: Basic SHA-256 hashing.
- **Hash with Salt**: Using bcrypt for secure password hashing.
- **HMAC**: Hash-based Message Authentication Code.
- **Key Pair**: RSA key pair generation.
- **Symmetric Encryption**: AES-256 encryption.
- **Asymmetric Encryption**: RSA encryption.
- **Salt**: Password salting with scrypt.
- **Sign**: Digital signatures using RSA.
- **Password Strength Checker**: Evaluates password strength based on multiple criteria.
- **Certificate Generation and Verification**: X.509 certificate generation and verification.
- **Diffie-Hellman Key Exchange**: Secure key exchange between two parties.
- **Secure Random Number Generation**: Generates cryptographically secure random numbers.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CryptographyConcepts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Each concept is implemented in its own directory. You can run the examples using Node.js:

```bash
node <concept-directory>/<script-name>.js
```

### Example: Running the Diffie-Hellman Key Exchange

```bash
node key-exchange/diffie-hellman.js
```

### Example: Running the Password Strength Checker

```bash
node password-strength/password-strength.js
```

### Example: Running the Certificate Generation

```bash
node certificate/certificate.js
```

### Example: Running the Secure Random Number Generator

```bash
node random/secure-random.js
```

## Dependencies

- `bcrypt`: For password hashing.
- `crypto`: Node.js built-in module for cryptographic operations.
- `node-forge`: For certificate generation and verification.
- `scrypt-js`: For password salting.

## License

This project is licensed under the ISC License. 