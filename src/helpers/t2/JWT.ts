import { decodeJwt, exportJWK, importJWK, importPKCS8, JWTPayload, SignJWT,  } from "jose";
import { DateNavigator } from "../Math";

export async function generateJWT(secret:string, data:{[key:string]:any}, aud?:string, scope?:string, expiry:Date = new DateNavigator().nextMinute(59) ){
  // const encodeSecret = new TextEncoder().encode(secret);
  secret = secret.replace(/\\n/g, '\n');
  const encodeSecret = await importPKCS8(secret, 'RS256');

  const jwt = new SignJWT(data as JWTPayload);
  jwt.setProtectedHeader({ alg: "RS256", typ: "JWT" }) // Set protected header
  .setIssuedAt() // Set the issue date
  .setExpirationTime(expiry) // Set the dynamic expiration time
  if(aud){
    jwt.setAudience
  }
  return jwt.sign(encodeSecret); // Sign the token with the secret key;
}

export function decryptJWT(jwt:string){
  return decodeJwt(jwt);
}