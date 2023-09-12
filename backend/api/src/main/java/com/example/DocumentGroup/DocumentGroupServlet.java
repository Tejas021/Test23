package main.java.com.example.DocumentGroup;

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
import main.java.com.example.Groups.GroupData;
import main.java.com.example.DocumentData;

public class DocumentGroupServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {

        try {

            int groupId = Integer.parseInt(request.getParameter("groupId"));
            List<DocumentData> documents = DocumentHandler.getDocumentsByGroup(groupId);
            System.out.println(groupId);
            // Convert the list of documents to JSON and send it as the response
            response.setContentType("application/json");
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.getWriter().write(new ObjectMapper().writeValueAsString(documents));
        } catch (Exception e) {
            e.printStackTrace();
        }
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
            DocumentGroupData data = objectMapper.readValue(requestData, DocumentGroupData.class);
            System.out.println(data);
            // Insert data into the database
            DocumentHandler.insertDocumentToAGroup(data);
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
