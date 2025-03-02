declare module "jsonwebtoken" {
  export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string | Buffer,
    options?: {
      algorithm?: string;
      expiresIn?: string | number;
      notBefore?: string | number;
      audience?: string | string[];
      issuer?: string;
      jwtid?: string;
      subject?: string;
      noTimestamp?: boolean;
      header?: object;
      keyid?: string;
    }
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: {
      algorithms?: string[];
      audience?: string | string[];
      clockTimestamp?: number;
      complete?: boolean;
      issuer?: string | string[];
      jwtid?: string;
      ignoreExpiration?: boolean;
      ignoreNotBefore?: boolean;
      subject?: string;
      maxAge?: string | number;
    }
  ): object;

  export function decode(
    token: string,
    options?: {
      complete?: boolean;
      json?: boolean;
    }
  ): null | { [key: string]: any } | string;
}
