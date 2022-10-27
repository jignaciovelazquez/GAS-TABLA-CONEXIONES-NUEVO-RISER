function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
    .setTitle("Control de Gestiones Telefonistas")
    .setFaviconUrl("https://freepngimg.com/download/telephone/13-2-telephone-free-download-png.png");
  return html

}



function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()

}