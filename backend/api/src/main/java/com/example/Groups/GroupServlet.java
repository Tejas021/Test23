package main.java.com.example.Groups;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.GroupLayout.Group;

import java.sql.Connection;
import java.sql.SQLException;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.java.com.example.DatabaseConnector;
import main.java.com.example.DocumentData;
import main.java.com.example.DocumentHandler;

public class GroupServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        String contextPath = request.getContextPath();
        String pathInfo = requestURI.substring(4);
        System.out.println(pathInfo);
        System.out.println(contextPath);
        System.out.println(requestURI);
        String jsonGroups = null;

        try {
            if (pathInfo == null) {
                System.out.println(pathInfo);
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request path");
                return;
            }

            if (pathInfo.equals("/group/all")) {
                List<GroupData> groups = GroupHandler.getAllgroups();
                jsonGroups = jsonResponse(groups);
            } else if (pathInfo.startsWith("/group/")) {
                System.out.println("inside");
                String[] pathParts = pathInfo.split("/");
                System.out.println(pathParts[2]);
                // if (pathParts.length != 3) {
                // response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid document
                // path");
                // return;
                // }

                int groupId = Integer.parseInt(pathParts[2]);
                System.out.println(groupId);
                GroupData group = GroupHandler.getGroupById(groupId);
                System.out.println(group);
                jsonGroups = jsonResponse(group);
            }
        } catch (Exception err) {
            System.out.println(err);
        }

        // Set content type to JSON
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP //
                                                                                               // methods
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
        // Serialize the Map to JSON
        // Write JSON string to the response output stream
        response.getWriter().write(jsonGroups);
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
            GroupData data = objectMapper.readValue(requestData, GroupData.class);
            System.out.println(data);
            // Insert data into the database
            GroupHandler.insertGroup(data);
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
