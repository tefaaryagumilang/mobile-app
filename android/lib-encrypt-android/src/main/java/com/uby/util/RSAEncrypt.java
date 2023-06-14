package com.uby.util;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;


public class RSAEncrypt extends ReactContextBaseJavaModule{

    public RSAEncrypt(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public static PublicKey getPublicKey(String pubKeyStr) {

        PublicKey pubKey = null;
        try {
            byte[] publicBytes = UtilBase64.base64Decode(pubKeyStr);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicBytes);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            pubKey = keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return pubKey;
    }

    public static String getEncryptedString(String originalString, PublicKey pubKey) {
        String encStr = "";
        try {
            Cipher enc = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            enc.init(Cipher.ENCRYPT_MODE, pubKey);
            byte[] cipherText = enc.doFinal((originalString).getBytes());
            encStr = UtilBase64.base64Encode(cipherText);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encStr;
    }

    @Override
    public String getName() {
        return "RSAEncryptAndroid";
    }

    @ReactMethod
    public void getRSAEncodedStr(
            String originalText,
            String publicKey,
            Callback successCallBack) {
        try {
            PublicKey pk = RSAEncrypt.getPublicKey(publicKey);
            assert (pk != null);
            String encryptedString = RSAEncrypt.getEncryptedString(originalText, pk);
            successCallBack.invoke(encryptedString);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

};
