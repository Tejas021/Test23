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

public class GetTocStructureServlet extends TOCManagementServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        int tocId = Integer.parseInt(request.getParameter("tocId"));
        try {

            String tocStructure = TOCHandler.getTOCStructure(tocId);
            JsonObject tocJsonObject = JsonParser.parseString(tocStructure).getAsJsonObject();
            String tocsJsonResponse = TOCHandler.getTocWithDocumentNamesRecursive(tocJsonObject).toString();
            System.out.println(tocsJsonResponse);
            sendJsonResponse(response, tocsJsonResponse);

        } catch (Exception err) {
            err.printStackTrace();
        }

    }

}
