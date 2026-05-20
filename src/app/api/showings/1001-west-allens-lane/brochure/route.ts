import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";
import { siteUrl } from "@/lib/site-config";
import { WestAllensBrochure } from "@/lib/showings/west-allens-brochure";

export const runtime = "nodejs";

async function dataUrlFromPublic(relativePath: string, mimeType: string) {
  const file = await fs.readFile(path.join(process.cwd(), "public", relativePath));
  return `data:${mimeType};base64,${file.toString("base64")}`;
}

export async function GET() {
  const [heroImageDataUrl, logoDataUrl, agentPhotoDataUrl, qrCodeDataUrl] =
    await Promise.all([
      dataUrlFromPublic("showings/1001-west-allens-lane/A.jpg", "image/jpeg"),
      dataUrlFromPublic("brand/lyl-realty-group-logo-inverted.png", "image/png"),
      dataUrlFromPublic("agents/tony-goodman.jpg", "image/jpeg"),
      QRCode.toDataURL(`${siteUrl}/showings/1001-west-allens-lane`, {
        width: 220,
        margin: 1,
        color: { dark: "#1A1A2E", light: "#FFFFFF" },
      }),
    ]);

  const pdfBuffer = await renderToBuffer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createElement(WestAllensBrochure, {
      heroImageDataUrl,
      logoDataUrl,
      agentPhotoDataUrl,
      qrCodeDataUrl,
    }) as any
  );
  const arrayBuffer = pdfBuffer.buffer.slice(
    pdfBuffer.byteOffset,
    pdfBuffer.byteOffset + pdfBuffer.byteLength
  ) as ArrayBuffer;

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="lyl-realty-1001-west-allens-lane-showing-brochure.pdf"',
      "Content-Length": pdfBuffer.length.toString(),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
