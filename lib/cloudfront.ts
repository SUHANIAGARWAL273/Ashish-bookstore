import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export function generateSignedUrl(fileName: string) {
    console.log(
        "CloudFront private key loaded:",
        !!process.env.CLOUDFRONT_PRIVATE_KEY
    );
  const privateKey = Buffer.from(
    process.env.CLOUDFRONT_PRIVATE_KEY!,
    "base64"
  ).toString("utf-8");

  return getSignedUrl({
    url: `https://d117z51sy2soxm.cloudfront.net/${fileName}`,
    keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID!,
    privateKey,
    dateLessThan: new Date(Date.now() + 10 * 60 * 1000),
  });
}