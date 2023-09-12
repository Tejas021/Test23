package main.java.com.example;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Locale;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.java.com.example.DocumentGroup.DocumentGroupData;

import com.fasterxml.jackson.core.JsonProcessingException;

public class DocumentHandler {

    public static Connection getConnection() throws SQLException {
        return DatabaseConnector.getConnection();
    }

    public static void insertDocument(DocumentData data) {
        ObjectMapper objectMapper = new ObjectMapper();
        Connection connection = null;
        try {
            connection = getConnection();
            String callProcedure = "{CALL insert_document(?, ?, ?, ?, ?)}"; // Replace with your stored procedure name
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                statement.setString(1, data.getBody());
                statement.setString(2, data.getTitle());
                String tagsJson = objectMapper.writeValueAsString(data.getTags());
                statement.setString(3, tagsJson);
                statement.setString(4, data.getAccessLevel());
                statement.setString(5, data.getOwner());

                statement.execute();
            }
        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        } finally {
            // Close the connection in the finally block
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void insertDocumentToAGroup(DocumentGroupData data) {
        Connection connection = null;
        try {
            connection = getConnection();
            String callProcedure = "{CALL add_document_to_group(?,?)}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                statement.setInt(1, data.getGroupId());
                statement.setInt(2, data.getDocumentId());

                statement.execute();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close the connection in the finally block
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public static List<DocumentData> getAllDocuments() {
        List<DocumentData> documents = new ArrayList<>();
        Connection connection = null;
        try {

            connection = getConnection();
            String callProcedure = "{CALL get_all_documents()}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                ResultSet resultSet = statement.executeQuery();

                while (resultSet.next()) {
                    DocumentData document = new DocumentData();
                    document.setId(resultSet.getInt("id"));
                    document.setBody(resultSet.getString("body"));
                    document.setTitle(resultSet.getString("title"));
                    document.setTags(parseTags(resultSet.getString("tags"))); // Parse JSON or CSV
                    document.setAccessLevel(resultSet.getString("accessLevel"));
                    document.setCreatedAt(resultSet.getTimestamp("created_at"));
                    document.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                    document.setOwner(resultSet.getString("owner"));

                    documents.add(document);
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return documents;
    }

    public static List<DocumentData> getDocumentsByEmail(String email) {
        List<DocumentData> documents = new ArrayList<>();
        Connection connection = null;
        try {

            connection = getConnection();
            String callProcedure = "{CALL get_documents_by_owner(?)}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                statement.setString(1, email);
                ResultSet resultSet = statement.executeQuery();

                while (resultSet.next()) {
                    DocumentData document = new DocumentData();
                    document.setId(resultSet.getInt("id"));
                    document.setBody(resultSet.getString("body"));
                    document.setTitle(resultSet.getString("title"));
                    document.setTags(parseTags(resultSet.getString("tags"))); // Parse JSON or CSV
                    document.setAccessLevel(resultSet.getString("accessLevel"));
                    document.setCreatedAt(resultSet.getTimestamp("created_at"));
                    document.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                    document.setOwner(resultSet.getString("owner"));

                    documents.add(document);
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return documents;
    }

    public static List<DocumentData> getDocumentsByGroup(int groupId) {
        List<DocumentData> documents = new ArrayList<>();
        Connection connection = null;
        try {

            connection = getConnection();
            String callProcedure = "{CALL get_documents_by_group(?)}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                statement.setInt(1, groupId);
                ResultSet resultSet = statement.executeQuery();

                while (resultSet.next()) {
                    DocumentData document = new DocumentData();
                    document.setId(resultSet.getInt("id"));
                    document.setBody(resultSet.getString("body"));
                    document.setTitle(resultSet.getString("title"));
                    document.setTags(parseTags(resultSet.getString("tags"))); // Parse JSON or CSV
                    document.setAccessLevel(resultSet.getString("accessLevel"));
                    document.setCreatedAt(resultSet.getTimestamp("created_at"));
                    document.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                    document.setOwner(resultSet.getString("owner"));

                    documents.add(document);
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return documents;
    }

    public static DocumentData getDocumentById(int documentId) {
        DocumentData document = null;
        Connection connection = null;
        try {
            connection = getConnection();
            String callProcedure = "{CALL get_document_by_id(?)}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                statement.setInt(1, documentId);
                ResultSet resultSet = statement.executeQuery();

                if (resultSet.next()) {
                    document = new DocumentData();
                    document.setId(resultSet.getInt("id"));
                    document.setBody(resultSet.getString("body"));
                    document.setTitle(resultSet.getString("title"));
                    document.setTags(parseTags(resultSet.getString("tags"))); // Parse JSON or CSV
                    document.setAccessLevel(resultSet.getString("accessLevel"));
                    document.setCreatedAt(resultSet.getTimestamp("created_at"));
                    document.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                    document.setOwner(resultSet.getString("owner"));
                }

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return document;
    }

    public static List<DocumentData> searchDocuments(String query) {
        List<DocumentData> documents = getAllDocuments();
        List<DocumentData> matchingDocuments = new ArrayList<>();
        String queryLowerCase = query.toLowerCase(Locale.ENGLISH); // Convert query to lowercase

        for (DocumentData document : documents) {
            String title = document.getTitle();
            if (title != null) {
                title = title.toLowerCase(Locale.ENGLISH); // Convert title to lowercase
            }
            List<String> tags = document.getTags();
            String htmlContent = document.getBody();

            if (title != null && title.contains(queryLowerCase)) {
                matchingDocuments.add(document);
            } else {
                boolean foundInTags = false;
                for (String tag : tags) {
                    if (tag != null && tag.toLowerCase(Locale.ENGLISH).contains(queryLowerCase)) {
                        foundInTags = true;
                        break; // No need to check other tags if a match is found
                    }
                }

                if (foundInTags) {
                    matchingDocuments.add(document);
                } else if (htmlContent != null) {
                    // Process the HTML content and check if query is in the text
                    String plainText = extractTextFromBody(htmlContent).toLowerCase(Locale.ENGLISH);
                    if (plainText.contains(queryLowerCase)) {
                        matchingDocuments.add(document);
                    }
                }
            }
        }
        return matchingDocuments;
    }

    // This method extracts text from HTML content while removing tags
    private static String extractTextFromBody(String html) {
        Document doc = Jsoup.parse(html);
        String plainText = doc.text(); // Extract plain text from the parsed document
        return plainText;
    }

    private static List<String> parseTags(String tagsJson) {
        List<String> tagList = new ArrayList<>();

        if (tagsJson != null && !tagsJson.isEmpty()) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                tagList = objectMapper.readValue(tagsJson, List.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace(); // Handle JSON parsing error
            }
        }

        return tagList;
    }
}
