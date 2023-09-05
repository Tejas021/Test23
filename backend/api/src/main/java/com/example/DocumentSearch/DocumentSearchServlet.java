package main.java.com.example;

import java.net.http.HttpRequest;
import java.util.List;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

public class DocumentSearchServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        String query = request.getParameter("query");
        String jsonDocuments = null;
        try {
            List<DocumentData> documents = DocumentHandler.searchDocuments(query);
            jsonDocuments = jsonResponse(documents);
        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests
        // from any origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS"); // Allow specific HTTP //
        // methods
        response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow
        // specific headers

        response.getWriter().write(jsonDocuments);

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
