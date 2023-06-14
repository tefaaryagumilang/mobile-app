#!/bin/sh

echo "Decrypting keystore."

openssl aes-256-cbc -k "$KEY_STORE_PASSWORD" -in scripts/android/keystore/ubyapp-release-key.keystore.enc -d -a -out android/app/ubyapp-release-key.keystore

