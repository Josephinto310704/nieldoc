import { NextResponse } from "next/server";
import { PDFDocument, rgb, degrees } from "pdf-lib";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const watermarkText = formData.get("watermarkText") || "WATERMARK";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - (watermarkText.length * 8), // approximate centering
        y: height / 2,
        size: 50,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.5,
        rotate: degrees(45),
      });
    });

    const newPdfBytes = await pdfDoc.save();

    return new NextResponse(newPdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file.name.split('.')[0]}_watermark.pdf"`,
      },
    });

  } catch (error) {
    console.error("Watermark PDF error:", error);
    return NextResponse.json({ error: "Failed to watermark PDF" }, { status: 500 });
  }
}
