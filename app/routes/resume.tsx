export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

// Load PDF.js (simple)
async function loadPdfJs() {
    const pdfjs = await import("pdfjs-dist/build/pdf.mjs");

    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    return pdfjs;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    try {
        const pdfjs = await loadPdfJs();
        const { getDocument } = pdfjs;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context!, viewport }).promise;

        return await new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob)
                    return resolve({
                        imageUrl: "",
                        file: null,
                        error: "Failed to create image blob",
                    });

                const imageFile = new File([blob], file.name.replace(".pdf", ".png"), {
                    type: "image/png",
                });

                resolve({
                    imageUrl: URL.createObjectURL(blob),
                    file: imageFile,
                });
            });
        });
    } catch (err) {
        return { imageUrl: "", file: null, error: String(err) };
    }
}
