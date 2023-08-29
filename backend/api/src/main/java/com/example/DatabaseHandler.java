package main.java.com.example;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
public class DatabaseHandler {

    // private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/document_management"; // Replace with your database URL
    // private static final String USERNAME = "root";
    // private static final String PASSWORD = "12345";

    public static Connection getConnection() throws SQLException {
      return  DatabaseConnector.getConnection();
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
                statement.setString(5,data.getOwner());

                statement.execute();
            }
        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }finally {
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

    public static List<DocumentData> getAllDocuments(){
        List<DocumentData> documents  =  new ArrayList<>();
        Connection connection= null;
        try{

            connection = getConnection();
            String callProcedure = "{CALL get_all_documents()}";
            try( CallableStatement statement = connection.prepareCall(callProcedure)){
                ResultSet resultSet = statement.executeQuery();

                while(resultSet.next()){
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

        }catch(SQLException e){
            e.printStackTrace();
        }finally{
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


