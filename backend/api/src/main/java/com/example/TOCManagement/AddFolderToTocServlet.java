package main.java.com.example.TOCManagement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonArray;

public class AddFolderToTocServlet extends TOCManagementServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        int tocId = Integer.parseInt(request.getParameter("tocId"));
        String folderName = request.getParameter("folderName");
        String folderPath = request.getParameter("folderPath");
        response.setContentType("application/json");

        // Set CORS headers to allow requests from any origin
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        try {
            String tocStructure = TOCHandler.getTOCStructure(tocId);

            JsonObject tocJsonObject = JsonParser.parseString(tocStructure).getAsJsonObject();

            JsonObject newFolder = new JsonObject();
            newFolder.addProperty("toc_id", 34);
            newFolder.addProperty("toc_name", folderName);
            newFolder.add("subfolders", new JsonArray());
            newFolder.add("documents", new JsonArray());

            JsonObject updatedToc = TOCHandler.addFolderToFolder(tocJsonObject, folderPath, newFolder);
            response.getWriter().write(TOCHandler.getTocWithDocumentNamesRecursive(updatedToc).toString());
            if (updatedToc != null) {

                // Convert the updated TOC JsonObject back to a JSON string
                String updatedTocJsonString = updatedToc.toString();
                TOCHandler.upDateTocStructure(tocId, updatedTocJsonString);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Set CORS headers to allow requests from any origin
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
