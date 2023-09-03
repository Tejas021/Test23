package main.java.com.example.GoogleAPI;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
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
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GoogleAPIServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        StringBuilder response1 = new StringBuilder();
        String oauthToken = request.getParameter("token");
        String documentId = request.getParameter("documentId");
        System.out.println(oauthToken + documentId);
        try {
            String url = "https://docs.googleapis.com/v1/documents/" + documentId;
            URL apiUrl = new URL(url);

            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Java HTTP Client");
            connection.setRequestProperty("Authorization",
                    "Bearer " + oauthToken);
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response data
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;

            while ((inputLine = reader.readLine()) != null) {
                response1.append(inputLine);
            }
            reader.close();

            // Print the response data
            System.out.println("Response Data:\n" + response1.toString());

            // Close the connection
            connection.disconnect();
            response.setContentType("application/json");
            response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific
                                                                                                   // HTTP //
                                                                                                   // methods
            response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

            response.getWriter().write(response1.toString());
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
