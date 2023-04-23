import * as jwt from "jsonwebtoken";

const JWT_SECRET = {
  type: process.env.JWT_SECRET_TYPE || "HS256",
  key:
    process.env.JWT_SECRET_KEY ||
    "mysecretkey",
};

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: JWT_SECRET.type as "HS256" | "RS512",
  expiresIn: "10h",
};

interface GenerateJWTParams {
    defaultRole: string;
    allowedRoles: string[];
    claims?: Record<string, string | string[]>;
}

export function generateJWT(params: GenerateJWTParams): string {
  const payload = {
    "http://localhost/jwt/claims": {
        "x-allowed-roles": params.allowedRoles,
        "x-default-role": params.defaultRole,
        ...params.claims,
    },
  };
  return jwt.sign(payload, JWT_SECRET.key, JWT_CONFIG);
}

export function verifyJWT(token: string): boolean{
    let jwtresp = jwt.verify(token, JWT_SECRET.key);
    if(jwtresp.hasOwnProperty('http://localhost/jwt/claims')){
        let parsedResp = <jwt.JwtPayload> jwtresp;
        if(parsedResp['http://localhost/jwt/claims'] && parsedResp['http://localhost/jwt/claims']['X-User-Id'] === 'admin'){
            return true;
        }
        else{
            return false;
        }
    }
    else {
        return false
    }
}
