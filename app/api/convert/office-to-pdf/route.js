import { NextResponse } from "next/server";
import CloudConvert from "cloudconvert";
import fs from "fs";
import os from "os";
import path from "path";

import { randomUUID } from "crypto";

export async function POST(req) {
  if (!process.env.CLOUDCONVERT_API_KEY || process.env.CLOUDCONVERT_API_KEY === "your_api_key_here") {
    return NextResponse.json({ error: "CloudConvert API Key is not configured." }, { status: 500 });
  }

  const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY);

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const toolId = formData.get("toolId");
    const targetFormat = formData.get("targetFormat") || "pdf";
    const password = formData.get("password");

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFileName = `${Date.now()}-${randomUUID()}`;
    const tempFilePath = path.join(os.tmpdir(), tempFileName);
    fs.writeFileSync(tempFilePath, buffer);

    let operation = "convert";
    if (toolId === "compress-pdf") operation = "optimize";
    if (toolId === "protect-pdf") operation = "encrypt";
    if (toolId === "unlock-pdf") operation = "decrypt";

    let job = await cloudConvert.jobs.create({
      tasks: {
        "upload-file": {
          operation: "import/upload",
        },
        "process-file": {
          operation: operation,
          input: "upload-file",
          ...((toolId !== "compress-pdf" && toolId !== "protect-pdf" && toolId !== "unlock-pdf") && { output_format: targetFormat }),
          ...((toolId === "protect-pdf" || toolId === "unlock-pdf") && { password: password })
        },
        "export-file": {
          operation: "export/url",
          input: "process-file",
          archive_multiple_files: toolId === "pdf-to-jpg" ? true : false
        },
      },
    });

    const uploadTask = job.tasks.filter((task) => task.name === "upload-file")[0];
    const readStream = fs.createReadStream(tempFilePath);
    await cloudConvert.tasks.upload(uploadTask, readStream, file.name);

    job = await cloudConvert.jobs.wait(job.id);
    const exportTask = job.tasks.filter((task) => task.name === "export-file")[0];
    
    if (!exportTask.result || !exportTask.result.files) {
      throw new Error("Conversion failed or took too long");
    }

    const exportFile = exportTask.result.files[0];
    
    // Fetch the result from the generated URL
    const pdfResponse = await fetch(exportFile.url);
    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${exportFile.filename}"`,
      },
    });
  } catch (error) {
    console.error("CloudConvert error:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
