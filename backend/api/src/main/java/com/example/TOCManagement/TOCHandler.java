package main.java.com.example.TOCManagement;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.swing.tree.ExpandVetoException;

import main.java.com.example.DatabaseConnector;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class TOCHandler {

    public static Connection getConnection() throws SQLException {
        return DatabaseConnector.getConnection();
    }

    public static List<String> getAllTOCs() {

        List<String> tocs = new ArrayList<>();

        Connection connection = null;
        try {
            connection = getConnection();
            String sql = "CALL get_all_tocs()"; // Call the stored procedure

            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    while (resultSet.next()) {
                        // int tocId = resultSet.getInt("toc_id");
                        // String tocName = resultSet.getString("toc_name");
                        // String tocStructureJsonString = resultSet.getString("toc_structure");

                        // Convert the JSON string to a JsonObject
                        // JsonObject tocObject = new JsonObject();
                        // tocObject.addProperty("toc_id", tocId);
                        // tocObject.addProperty("toc_name", tocName);
                        // tocObject.addProperty("toc_structure", tocStructureJsonString);
                        JsonObject tocJsonObject = JsonParser.parseString(resultSet.getString("toc_structure"))
                                .getAsJsonObject();
                        tocs.add(getTocWithDocumentNamesRecursive(tocJsonObject).toString());
                    }
                }
            }
        } catch (Exception e) {
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
        return tocs;

    }

    public static String getTOCStructure(int tocId) {
        String tocStructure = null;
        Connection connection = null;
        try {
            connection = getConnection();
            String sql = "CALL GetTOC(?)"; // Call the stored procedure

            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setInt(1, tocId);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    if (resultSet.next()) {
                        tocStructure = resultSet.getString("toc_structure");
                    }
                }
            }
        } catch (Exception e) {
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
        return tocStructure;
    }

    public static void upDateTocStructure(int tocId, String updatedTocStructure) {
        Connection connection = null;
        try {
            connection = getConnection();
            CallableStatement callableStatement = connection.prepareCall("{call UpdateTocStructure(?, ?)}");
            callableStatement.setInt(1, tocId);
            callableStatement.setString(2, updatedTocStructure);

            // Execute the stored procedure
            callableStatement.execute();

        } catch (Exception e) {
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

    }

    public static JsonObject findFolderAndAppendDocument(JsonObject toc, String path, JsonObject newDocument) {
        // Split the folder path into individual folder names
        String[] folderNames = path.split("/");

        // Start with the root TOC object
        JsonObject currentFolder = toc;

        // Base case: If the folderNames array is empty, we've reached the target folder
        if (path.isEmpty()) {
            // Ensure the current folder has a 'documents' array
            if (!currentFolder.has("documents")) {
                currentFolder.add("documents", new JsonArray());
            }

            // Append the new document to the 'documents' array
            currentFolder.getAsJsonArray("documents").add(newDocument);

            // Return the entire updated TOC structure
            return toc;
        }

        // Get the first folder name in the path
        String firstFolderName = folderNames[0];

        // Check if the current folder has subfolders
        if (currentFolder.has("subfolders") && currentFolder.get("subfolders").isJsonArray()) {
            JsonArray subfolders = currentFolder.getAsJsonArray("subfolders");

            // Iterate through subfolders to find a match
            for (int i = 0; i < subfolders.size(); i++) {
                JsonElement subfolderElement = subfolders.get(i);
                JsonObject subfolder = subfolderElement.getAsJsonObject();

                // Check if the current subfolder matches the first folder name
                if (subfolder.has("toc_name") && subfolder.get("toc_name").getAsString().equals(firstFolderName)) {
                    // Recursively search for the rest of the path in the subfolder
                    String remainingPath = String.join("/", Arrays.copyOfRange(folderNames, 1, folderNames.length));
                    JsonObject updatedSubfolder = findFolderAndAppendDocument(subfolder, remainingPath, newDocument);

                    // If the subfolder was updated, replace it in the current folder's 'subfolders'
                    // array
                    if (updatedSubfolder != null) {
                        subfolders.set(i, updatedSubfolder);
                    }

                    // Return the entire updated TOC structure
                    return toc;
                }
            }
        }

        // If no match is found at this level, the folder path is invalid
        return toc; // Return the original TOC structure
    }

    // Function to add a folder to a folder within a TOC
    public static JsonObject addFolderToFolder(JsonObject toc, String path, JsonObject newFolder) {
        // Split the folder path into individual folder names
        String[] folderNames = path.split("/");

        // Start with the root TOC object
        JsonObject currentFolder = toc;

        // Base case: If the folderNames array is empty, we've reached the target folder
        if (path.isEmpty()) {
            // Ensure the current folder has a 'subfolders' array
            if (!currentFolder.has("subfolders")) {
                currentFolder.add("subfolders", new JsonArray());
            }

            // Append the new folder to the 'subfolders' array
            currentFolder.getAsJsonArray("subfolders").add(newFolder);

            // Return the entire updated TOC structure
            return toc;
        }

        // Get the first folder name in the path
        String firstFolderName = folderNames[0];

        // Check if the current folder has subfolders
        if (currentFolder.has("subfolders") && currentFolder.get("subfolders").isJsonArray()) {
            JsonArray subfolders = currentFolder.getAsJsonArray("subfolders");

            // Iterate through subfolders to find a match
            for (int i = 0; i < subfolders.size(); i++) {
                JsonElement subfolderElement = subfolders.get(i);
                JsonObject subfolder = subfolderElement.getAsJsonObject();

                // Check if the current subfolder matches the first folder name
                if (subfolder.has("toc_name") && subfolder.get("toc_name").getAsString().equals(firstFolderName)) {
                    // Recursively search for the rest of the path in the subfolder
                    String remainingPath = String.join("/", Arrays.copyOfRange(folderNames, 1, folderNames.length));
                    JsonObject updatedSubfolder = addFolderToFolder(subfolder, remainingPath, newFolder);

                    // If the subfolder was updated, replace it in the current folder's 'subfolders'
                    // array
                    if (updatedSubfolder != null) {
                        subfolders.set(i, updatedSubfolder);
                    }

                    // Return the entire updated TOC structure
                    return toc;
                }
            }
        }

        // If no match is found at this level, the folder path is invalid
        return toc; // Return the original TOC structure
    }

    public static JsonObject getTocWithDocumentNamesRecursive(JsonObject tocJsonObject) throws SQLException {
        // Fetch document names for the current level
        fetchDocumentNamesForLevel(tocJsonObject.getAsJsonArray("documents"));

        // Recursively process subfolders
        JsonArray subfolders = tocJsonObject.getAsJsonArray("subfolders");
        for (int i = 0; i < subfolders.size(); i++) {
            JsonObject subfolder = subfolders.get(i).getAsJsonObject();

            // Recursively fetch document names for subfolders
            JsonObject subfolderWithDocs = getTocWithDocumentNamesRecursive(subfolder);

            // Replace the subfolder with the one containing document names
            subfolders.set(i, subfolderWithDocs);
        }

        return tocJsonObject;
    }

    private static void fetchDocumentNamesForLevel(JsonArray documentsArray) {
        if (documentsArray != null) {
            for (int i = 0; i < documentsArray.size(); i++) {
                JsonObject document = documentsArray.get(i).getAsJsonObject();
                int documentId = document.get("document_id").getAsInt();

                // Fetch document name from the 'document' table (replace with your SQL query)]
                try {
                    String documentName = fetchDocumentNameFromDatabase(documentId);
                    document.addProperty("document_name", documentName);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                // Add document name to the JSON structure

            }
        }
    }

    private static String fetchDocumentNameFromDatabase(int documentId) throws SQLException {
        // Prepare SQL query to fetch document name from the 'document' table
        Connection connection = null;

        try {
            connection = getConnection();
            String sql = "CALL get_document_by_id(?)";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setInt(1, documentId);
                try (ResultSet resultSet = statement.executeQuery()) {

                    if (resultSet.next()) {
                        return resultSet.getString("title");
                    }
                }
            }
        } catch (Exception e) {
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
        return null; // Document not found or other error
    }

    public static void mapDocumentToToc(int tocId, int documentId) {
        Connection connection = null;
        try {
            connection = getConnection();
            String sqlString = "Call InsertDocumentTocMapping(?,?) ";
            try (CallableStatement statement = connection.prepareCall(sqlString)) {
                statement.setInt(1, documentId);
                statement.setInt(2, tocId);
                statement.execute();
            }

        } catch (Exception e) {
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

    }

    public static List<String> getTocByDocumentId(int tocId) {
        Connection connection = null;
        List<String> tocs = new ArrayList<>();
        try {
            connection = getConnection();
            String sqlString = "call GetTOCsByDocument(?)";
            try (CallableStatement statement = connection.prepareCall(sqlString)) {
                statement.setInt(1, tocId);
                ResultSet resultSet = statement.executeQuery();

                while (resultSet.next()) {
                    JsonObject tocJsonObject = JsonParser.parseString(resultSet.getString("toc_structure"))
                            .getAsJsonObject();
                    tocs.add(getTocWithDocumentNamesRecursive(tocJsonObject).toString());
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tocs;
    }
}
