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

import com.fasterxml.jackson.databind.ObjectMapper;

public class TOCManagementServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        int tocId = Integer.parseInt(request.getParameter("tocId"));
        try {
            if (tocId == 0) {
                System.out.println("called");
                String tocsJsonResponse = jsonResponse(TOCHandler.getAllTOCs());
                sendJsonResponse(response, tocsJsonResponse);
            } else {
                String tocsJsonResponse = TOCHandler.getTOCStructure(tocId).toString();
                sendJsonResponse(response, tocsJsonResponse);
            }

        } catch (Exception err) {
            err.printStackTrace();
        }

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        int tocId = Integer.parseInt(request.getParameter("tocId"));
        int documentId = Integer.parseInt(request.getParameter("documentId"));
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

            JsonObject newDocument = new JsonObject();
            newDocument.addProperty("document_id", documentId);
            newDocument.addProperty("document_name", "New Document");

            JsonObject updatedToc = TOCHandler.findFolderAndAppendDocument(tocJsonObject, folderPath, newDocument);
            response.getWriter().write(TOCHandler.getTocWithDocumentNamesRecursive(updatedToc).toString());
            if (updatedToc != null) {

                // Convert the updated TOC JsonObject back to a JSON string
                String updatedTocJsonString = updatedToc.toString();
                TOCHandler.upDateTocStructure(tocId, updatedTocJsonString);
                TOCHandler.mapDocumentToToc(tocId, documentId);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    void sendJsonResponse(HttpServletResponse response, String jsonResponse) {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP //
                                                                                               // methods
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
        // Serialize the Map to JSON
        // Write JSON string to the response output stream
        try {
            response.getWriter().write(jsonResponse);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    protected String jsonResponse(Object data) {
        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(data);
        } catch (Exception e) {
            System.out.println(e);
            return null;
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