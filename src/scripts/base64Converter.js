import "base64-img";
import { base64, base64Sync, imgSync } from "base64-img";

class base64Converter {
    async ImagetoBase64 (imgurl) {
        return (base64Sync(imgurl));
    }

    async Base64toImage (strdata) {
        return (imgSync());
    }
}

export default base64Converter;