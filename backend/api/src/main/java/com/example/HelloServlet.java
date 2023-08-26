package com.example;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set content type to JSON
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Create a Map for the JSON response
        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("message", "Hello from HelloServledt!");

        // Serialize the Map to JSON
        String json = objectMapper.writeValueAsString(jsonResponse);

        // Write JSON string to the response output stream
        response.getWriter().write(json);
    }
}
