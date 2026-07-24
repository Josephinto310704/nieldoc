import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      
      let image;
      if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else if (mimeType === "image/png") {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        // Skip unsupported
        continue;
      }

      const { width, height } = image.scale(1);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="images-to-pdf.pdf"',
      },
    });
  } catch (error) {
    console.error("Error converting images to PDF:", error);
    return NextResponse.json({ error: "Failed to convert images to PDF" }, { status: 500 });
  }
}
