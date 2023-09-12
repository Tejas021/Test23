package main.java.com.example.TOCManagement;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TOCWithDocumentIdServlet extends TOCManagementServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        int tocId = Integer.parseInt(request.getParameter("tocId"));
        int documentId = Integer.parseInt(request.getParameter("documentId"));
        try {
            TOCHandler.mapDocumentToToc(tocId, documentId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        int documentId = Integer.parseInt(request.getParameter("documentId"));
        List<String> tocs = null;
        String jsonTocs = null;
        try {

            tocs = TOCHandler.getTocByDocumentId(documentId);
            jsonTocs = jsonResponse(tocs);
        } catch (Exception e) {
            e.printStackTrace();
        }
        sendJsonResponse(response, jsonTocs);

    }

}
