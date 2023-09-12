package main.java.com.example.Groups;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

import main.java.com.example.DatabaseConnector;
import main.java.com.example.Groups.GroupData;

import com.fasterxml.jackson.core.JsonProcessingException;

public class GroupHandler {

    public static Connection getConnection() throws SQLException {
        return DatabaseConnector.getConnection();
    }

    public static void insertGroup(GroupData data) {
        ObjectMapper objectMapper = new ObjectMapper();
        Connection connection = null;
        try {
            connection = getConnection();
            String callProcedure = "{CALL create_group(?, ?)}"; // Replace with your stored procedure name
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                statement.setString(1, data.getTitle());
                statement.setString(2, data.getDescription());

                statement.execute();
            }
        } catch (SQLException e) {
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

    public static List<GroupData> getAllgroups() {
        List<GroupData> groups = new ArrayList<>();
        Connection connection = null;
        try {

            connection = getConnection();
            String callProcedure = "{CALL fetch_all_groups()}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                ResultSet resultSet = statement.executeQuery();

                while (resultSet.next()) {
                    GroupData group = new GroupData();
                    group.setId(resultSet.getInt("id"));
                    group.setTitle(resultSet.getString("title"));
                    group.setDescription(resultSet.getString("description"));

                    group.setCreatedAt(resultSet.getTimestamp("created_at"));
                    group.setUpdatedAt(resultSet.getTimestamp("updated_at"));

                    groups.add(group);
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
        return groups;
    }

    public static GroupData getGroupById(int groupId) {
        GroupData group = null;
        Connection connection = null;
        try {
            System.out.println(groupId);
            connection = getConnection();
            String callProcedure = "{CALL fetch_group_by_id(?)}";
            try (CallableStatement statement = connection.prepareCall(callProcedure)) {
                System.out.println(groupId);
                statement.setInt(1, groupId);
                ResultSet resultSet = statement.executeQuery();

                if (resultSet.next()) {
                    group = new GroupData();
                    group.setId(resultSet.getInt("id"));

                    group.setTitle(resultSet.getString("title"));
                    group.setCreatedAt(resultSet.getTimestamp("created_at"));
                    group.setUpdatedAt(resultSet.getTimestamp("updated_at"));
                    group.setDescription(resultSet.getString("description"));
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
        return group;
    }

}
