var url = './lore_ipsum.pdf';
var pdfjsLib = window['pdfjs-dist/build/pdf'];

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  renderAllPages(pdf)
}, function (reason) {
  console.error(reason);
});

function renderPage(page) {
  var scale = 1.5;
  var viewport = page.getViewport(scale);
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var renderContext = {
    canvasContext: ctx,
    viewport: viewport
  };

  canvas.height = viewport.height;
  canvas.width = viewport.width;
  document.getElementById('holder').appendChild(canvas);

  page.render(renderContext);
}

function renderAllPages(pdf) {
  for(var number = 1; number <= pdf.numPages; number++)
    pdf.getPage(number).then(renderPage);
}
