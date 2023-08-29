package main.java.com.example;

import java.sql.Timestamp;
import java.util.List;

public class DocumentData {
    private int id;
    private String body;
    private String title;
    private List<String> tags;
    private String accessLevel;
    private String owner;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String status;
    // Constructors (if needed)


    public String getStatus() {
        return status;
    }

    public void setStatus(string status) {
        this.status = status;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int id){
        this.id=id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags( List<String> tags) {
        this.tags = tags;
    }

    public String getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(String accessLevel) {
        this.accessLevel = accessLevel;
    }

    public String getOwner(){
        return this.owner;
    }

    public void setOwner(String owner){
        this.owner = owner;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

}