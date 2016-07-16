function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate() 
    .setTitle('Form')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function uploadFiles(form)
{
  Logger = BetterLog.useSpreadsheet('****'); 
  try {
    var dropbox = "uploads";
    var folder, folders = DriveApp.getFoldersByName(dropbox);
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }
    
    var spreadsheet_name = "forminput";
    var file, spreadsheet, sheet;
    Logger.log(folders);
    //folder = folders.next();
    Logger.log(folder);
    ;
    // Get the spread sheet, or create it if needed
    spreadsheet = SpreadsheetApp.openByUrl("****");
    Logger.log(spreadsheet.getName());

    // Get the file blobs from the form
    var blob1 = form.myFile1;
    var blob2 = form.myFile2;
    var blob3 = form.myFile3;
    var blob4 = form.myFile4;
    
    var contentType1 = blob1.getContentType();
    var contentType2 = blob2.getContentType();
    var contentType3 = blob3.getContentType();
    var contentType4 = blob4.getContentType();
    
    if (contentType1 != "application/octet-stream") {
      var file1 = folder.createFile(blob1);
      var url1 = file1.getUrl();  
    } else {
      var url1 = "";
    }
    
    if (contentType2 != "application/octet-stream") {
      var file2 = folder.createFile(blob2);
      var url2 = file2.getUrl();  
    } else {
      var url2 = "";
    }
    
    if (contentType3 != "application/octet-stream") {
      var file3 = folder.createFile(blob3);
      var url3 = file3.getUrl();  
    } else {
      var url3 = "";
    }
    
    if (contentType4 != "application/octet-stream") {
      var file4 = folder.createFile(blob4);
      var url4 = file4.getUrl();  
    } else {
      var url4 = "";
    }   
   
    Logger.log("Works till here");
    
    var row = [form.TypeData, form.other_details,
    form.date, 
    form.time,
    form.location,
    form.coordinates,
    form.Building,
    form.Vegetation,
    form.Water_Body,
    form.Soil,
    form.Concrete,
    form.Vehicle,
    form.Mountain,
    form.Land_Subsidence,
    form.Fossil,
    form.Signage,
    form.Bridges,
    form.Tunnels,
    form.Road,
    form.Traffic_Light,
    form.Park,
    form.Digging_Site,
    form.Other,
    form.other_checkbox_text,
    form.filetext1,
    url1,
    form.filetext2,
    url2,
    form.filetext3,
    url3,
    form.filetext4,
    url4];

    Logger.log(row);

    sheet = spreadsheet.setActiveSheet(spreadsheet.getSheets()[0]);
    sheet.appendRow(row);


  } catch (error){
    Logger.log(error.toString());
    return error.toString();
  }
}
