
// JavaScript Document

xmlDocumentAPP = new XMLHttpRequest(); 
var page_xml_APP_path=base_url+"appsettings.xml";

xmlDocumentAPP.open("GET", page_xml_APP_path, false);     // here we need the path to xml document                   
xmlDocumentAPP.send();                        
xmlDocumentAPP=xmlDocumentAPP.responseXML; 


if (xmlDocumentAPP.getElementsByTagName("enabledownload")[0].childNodes[0].nodeValue!=1)
	{
		document.getElementById('download').style.visibility="hidden";
		document.getElementById('download').style.display="none";
	}
else
	{
		var first_row = xmlDocument.getElementsByTagName("doc");
		var PDF_file_name = first_row[0].attributes.getNamedItem("filename").value;
		var PDF_url=base_url+PDF_file_name;
		document.getElementById('download').href=PDF_url;
		
		
	}

if (xmlDocumentAPP.getElementsByTagName("enablethumnails")[0].childNodes[0].nodeValue!=1)
	{
		document.getElementById('thumb').style.visibility="hidden";
		document.getElementById('thumb').style.display="none";
		
	}

if (xmlDocumentAPP.getElementsByTagName("enablesend")[0].childNodes[0].nodeValue!=1)
	{
		document.getElementById('share').style.visibility="hidden";
		document.getElementById('share').style.display="none";	
		
	}
if (xmlDocumentAPP.getElementsByTagName("enablesearch")[0].childNodes[0].nodeValue!=1)
	{
		document.getElementById('search').style.visibility="hidden";
		document.getElementById('search').style.display="none";	
			
	}

