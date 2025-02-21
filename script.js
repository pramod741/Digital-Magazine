let pdfDoc = null,
    pageNum = 1,
    scale = 1.5,
    fileURL = "";

document.getElementById("file-input").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        fileURL = URL.createObjectURL(file);
        loadPDF(fileURL);
    } else {
        alert("Please select a valid PDF file.");
    }
});

document.getElementById("prev").addEventListener("click", function () {
    if (pdfDoc && pageNum > 1) {
        pageNum--;
        renderPage(pageNum);
    }
});

document.getElementById("next").addEventListener("click", function () {
    if (pdfDoc && pageNum < pdfDoc.numPages) {
        pageNum++;
        renderPage(pageNum);
    }
});

document.getElementById("fullscreen").addEventListener("click", function () {
    let viewer = document.getElementById("pdf-canvas");
    if (viewer.requestFullscreen) {
        viewer.requestFullscreen();
    } else if (viewer.mozRequestFullScreen) {
        viewer.mozRequestFullScreen();
    } else if (viewer.webkitRequestFullscreen) {
        viewer.webkitRequestFullscreen();
    } else if (viewer.msRequestFullscreen) {
        viewer.msRequestFullscreen();
    }
});

// Load and render PDF
function loadPDF(url) {
    pdfjsLib.getDocument(url).promise.then((pdf) => {
        pdfDoc = pdf;
        pageNum = 1;
        renderPage(pageNum);
    });
}

// Render a specific page
function renderPage(num) {
    pdfDoc.getPage(num).then((page) => {
        const canvas = document.getElementById("pdf-canvas");
        const ctx = canvas.getContext("2d");
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({ canvasContext: ctx, viewport });
    });
}
