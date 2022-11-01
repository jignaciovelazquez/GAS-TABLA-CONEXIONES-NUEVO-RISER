function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
    .setTitle("Tabla de Conexiones Montantes FTTH")
    .setFaviconUrl("https://www.freeiconspng.com/uploads/table-icon-png-2.png");
  return html

}



function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()

}