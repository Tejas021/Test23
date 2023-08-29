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
import main.java.com.example.DatabaseHandler;
import main.java.com.example.DocumentData;

public class DocumentServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Connection connection = null;
  List<DocumentData> documents =null;
        try{
           documents= DatabaseHandler.getAllDocuments();
           
            System.out.println("successful connection");
        }catch(Exception err){
            System.out.println("hello wosasfsafasdfsarlds");
           System.out.println(err);
        }
        // Set content type to JSON
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Create a Map for the JSON response
        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("message", "Hello to Home!");

        // Serialize the Map to JSON
        String jsonDocuments = objectMapper.writeValueAsString(documents);

        // Write JSON string to the response output stream
        response.getWriter().write(jsonDocuments);
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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


        try{
     DocumentData data = objectMapper.readValue(requestData, DocumentData.class);
        System.out.println(data);
        // Insert data into the database
        DatabaseHandler.insertDocument(data);
        }catch(Exception e){
            System.out.println(e);
        }
   


        // You can now parse and process the requestData as needed
        // For demonstration purposes, let's just echo the received data
        String jsonResponse = objectMapper.writeValueAsString(requestData);

        // Write JSON string to the response output stream
        response.getWriter().write(jsonResponse);
    }

    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set CORS headers to allow requests from any origin
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
