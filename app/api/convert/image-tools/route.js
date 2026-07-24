import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const file = formData.get("file"); // Used if not multiple
    const toolId = formData.get("toolId");

    const inputFiles = files.length > 0 ? files : (file ? [file] : []);

    if (inputFiles.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (toolId === "image-resizer") {
      const resizeMode = formData.get("resizeMode");
      const scale = parseFloat(formData.get("scale"));
      const width = parseInt(formData.get("width"));
      const height = parseInt(formData.get("height"));
      const f = inputFiles[0];

      const buffer = Buffer.from(await f.arrayBuffer());
      const metadata = await sharp(buffer).metadata();

      let resizeOptions = {};
      if (resizeMode === "auto" && scale) {
        resizeOptions.width = Math.round(metadata.width * scale);
      } else {
        if (width) resizeOptions.width = width;
        if (height) resizeOptions.height = height;
      }

      const outputBuffer = await sharp(buffer)
        .resize(resizeOptions)
        .toBuffer();
      
      const ext = f.name.split('.').pop();
      return new NextResponse(outputBuffer, {
        status: 200,
        headers: {
          "Content-Type": `image/${ext}`,
          "Content-Disposition": `attachment; filename="resized_${f.name}"`,
        },
      });
    }

    if (toolId === "png-to-jpg" || toolId === "webp-to-jpg") {
      // For multiple images, we ideally return a ZIP if > 1. 
      // But for simplicity in this MVP, let's just process the first one if Uploader sends multiple,
      // or we can just assume multiple=true is not fully supported without JSZip yet in this route.
      // Wait, let's just process the first one for now, as JSZip requires a bit more logic.
      // Actually, we can just use JSZip here if files.length > 1.
      
      if (inputFiles.length === 1) {
        const f = inputFiles[0];
        const buffer = Buffer.from(await f.arrayBuffer());
        const outputBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
        
        return new NextResponse(outputBuffer, {
          status: 200,
          headers: {
            "Content-Type": "image/jpeg",
            "Content-Disposition": `attachment; filename="${f.name.split('.')[0]}.jpg"`,
          },
        });
      } else {
        // If multiple files, we use JSZip
        const JSZip = require('jszip');
        const zip = new JSZip();
        
        for (const f of inputFiles) {
          const buffer = Buffer.from(await f.arrayBuffer());
          const outputBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
          zip.file(`${f.name.split('.')[0]}.jpg`, outputBuffer);
        }
        
        const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
        return new NextResponse(zipBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="converted_images.zip"`,
          },
        });
      }
    }

    return NextResponse.json({ error: "Invalid toolId" }, { status: 400 });

  } catch (error) {
    console.error("Image tools error:", error);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}
