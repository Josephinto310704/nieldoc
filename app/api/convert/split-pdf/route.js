import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    
    const zip = new JSZip();

    // Create a new PDF for each page
    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);
      
      const newPdfBytes = await newPdf.save();
      zip.file(`page_${i + 1}.pdf`, newPdfBytes);
    }

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${file.name.split('.')[0]}_split.zip"`,
      },
    });

  } catch (error) {
    console.error("Split PDF error:", error);
    return NextResponse.json({ error: "Failed to split PDF" }, { status: 500 });
  }
}
