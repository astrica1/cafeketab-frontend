import Crypto from "crypto-js";

class Hashing {
    static String2MD5 (str) {
        return (Crypto.MD5(str).toString());
    }

    static String2SHA512 (str) {
        return (Crypto.SHA512(str).toString());
    }

    static String2SHA1 (str) {
        return (Crypto.SHA1(str).toString());
    }

    String2Base64 (str) {
        return (Crypto.enc.Base64.stringify(str));
    }
}

export default Hashing;