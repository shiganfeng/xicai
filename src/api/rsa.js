import JsEncrypt from "jsencrypt"

export const setRSApass = (password) => {
    let jse = new JsEncrypt()
        //公钥
    let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTm29MgeIEtr1yojbvkk0BiF8YDsH/AseTrNDHiAzOiv0oQxLWytP5w+7eK98q8nN2o5lrdx58+kbU8VMjr68Ez11OOQu05uiw4R6L4frNWcdD72xrPYfj2BlSa5teuQTUxXIo49e/KACcjiz54s31XHSl1azolDi9Xr0bgo3SzwIDAQAB'
    jse.setPublicKey(publicKey)
        //加密内容
    let encrypted = jse.encrypt(password)
        // console.log(encrypted)
    return encrypted
}

export const getRSApass = (password) => {
    let jse = new JsEncrypt()
        //私钥
    let privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJObb0yB4gS2vXKiNu+STQGIXxgOwf8Cx5Os0MeIDM6K/ShDEtbK0/nD7t4r3yryc3ajmWt3Hnz6RtTxUyOvrwTPXU45C7Tm6LDhHovh+s1Zx0PvbGs9h+PYGVJrm165BNTFcijj178oAJyOLPnizfVcdKXVrOiUOL1evRuCjdLPAgMBAAECgYBF6/qULm6ntv0VQXxujkpGMJiDZ/JD38g0z0dzTaJrcPGtUeCpuRkjFsqfmf60dHd3utXhT2M05sYI92xf2kg4cSZ6rd/mjpYUExbClwHfnIlr+793ucHIeRBi1lrlK7KwOWBhm22U2Yi5hjF/IKay/scsDm6KpuhAN/a9AKe2MQJBANT8whoSiBKdi7KgT0SeYt4qTJA+IKYg4+M3jC1C8WnYBzl1usDCBnQGpdHcUcsFQllIEchwalQqDqhO9BZgAjcCQQCxapWRbr6O+LyP4X9m152hR/HcrKaO6bTvU0IJOe24hz0MyxXyVzORoovmXraruGhsK5cUzz1upgna3KTI4kgpAkAh72vVz6ISpTt+6H/4xOunzkGIsf1tusvUhiM1ivcAEEWGaDWrRL7WecCt4Va+7EWYCB2dPBwU8OaI9pt5fS6dAkB5UnmVSjXlbxMDESEeIrQYZipuzWHYuNiSEE1IIeT+Gv0UkowffKI3JQCmOH6STziZP/XAtTc9Qy3aDKhi9tqBAkEA0qOZafEBabKLveLxrfZcgttC0NOlzqBkNj1Xch+MqwZyynXeYrHfV+S05JPYqrlOIZN96fNA0uo2yX62fKPjRQ=='
    jse.setPrivateKey(privateKey)
        //解密内容
    let decrypt = jse.decrypt(password)
        // console.log(decrypt)
    return decrypt
}