package stayalive.message;

import org.json.JSONObject;

public class Message {

    private final String message;

    public Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        final JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        return (jsonObject.toString());
    }
}
