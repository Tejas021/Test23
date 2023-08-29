package main.java.com.example;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class DatabaseConnector {
    private static final String URL = "jdbc:mysql://localhost:3306/document_management";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "12345";
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch ( SQLException  | ClassNotFoundException e) {
          System.out.println(e);
            throw new SQLException("Error connecting to the database.", e);
        }
    }

}
