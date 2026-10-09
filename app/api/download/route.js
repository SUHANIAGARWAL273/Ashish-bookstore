import { generateSignedUrl } from "@/lib/cloudfront";

export async function GET() {
  try {
    const signedUrl = generateSignedUrl("test_book.pdf.pdf");

    return Response.json({
      success: true,
      url: signedUrl,
    });
  } catch (error) {
    console.error("Download URL error:", error);

    return Response.json(
      {
        success: false,
        error: "Could not generate download link",
      },
      {
        status: 500,
      }
    );
  }
}