package com.example;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.SQLException;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.java.com.example.DatabaseConnector;
import main.java.com.example.DocumentHandler;
import main.java.com.example.DocumentData;

public class DocumentServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        String contextPath = request.getContextPath();
        String pathInfo = requestURI.substring(contextPath.length());

        String jsonDocuments = null;

        try {
            if (pathInfo == null) {
                System.out.println(pathInfo);
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request path");
                return;
            }
            if (pathInfo.equals("/document/all")) {
                System.out.println("all");
                List<DocumentData> documents = DocumentHandler.getAllDocuments();
                jsonDocuments = jsonResponse(documents);
            } else if (pathInfo.startsWith("/document/")) {
                String[] pathParts = pathInfo.split("/");
                if (pathParts.length != 3) {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid document path");
                    return;
                }

                int documentId = Integer.parseInt(pathParts[2]);
                DocumentData document = DocumentHandler.getDocumentById(documentId);
                jsonDocuments = jsonResponse(document);
            }

        } catch (Exception err) {
            System.out.println("hello wosasfsafasdfsarlds");
            System.out.println(err);
        }
        // Set content type to JSON
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP
                                                                                               // methods
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

        // Serialize the Map to JSON

        // Write JSON string to the response output stream
        response.getWriter().write(jsonDocuments);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Set content type to JSON
        response.setContentType("application/json");

        // Set CORS headers to allow requests from any origin
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Read JSON data from the request body
        String requestData = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);

        try {
            DocumentData data = objectMapper.readValue(requestData, DocumentData.class);
            System.out.println(data);
            // Insert data into the database
            DocumentHandler.insertDocument(data);
        } catch (Exception e) {
            System.out.println(e);
        }

        // You can now parse and process the requestData as needed
        // For demonstration purposes, let's just echo the received data
        String jsonResponse = objectMapper.writeValueAsString(requestData);

        // Write JSON string to the response output stream
        response.getWriter().write(jsonResponse);
    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Set CORS headers to allow requests from any origin
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String jsonResponse(Object data) {
        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(data);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }
}
