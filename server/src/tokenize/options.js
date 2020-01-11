var iss = "TaraGelsin";
var sub = "info@taragelsin.com";
var aud = "https://taragelsin.com";

const signOptions = () => {
  return {
    issuer: iss,
    subject: sub,
    audience: aud,
    algorithm: "RS256"
  };
};

const verifyOptions = () => {
  return {
    issuer: iss,
    subject: sub,
    audience: aud,
    algorithm: ["RS256"]
  };
};

export default { signOptions, verifyOptions }