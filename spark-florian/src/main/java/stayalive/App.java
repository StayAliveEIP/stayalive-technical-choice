package stayalive;

import org.json.JSONObject;
import spark.Spark;
import stayalive.filter.AuthFilter;

import static spark.Spark.port;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Spark.port(8080);


        // Message
        Spark.get("/hello", (req, res) -> ("Hello World !"));

        // POST Message
        Spark.post("/post-message", (req, res) -> {
            try {
                final JSONObject body = new JSONObject(req.body());
                if (!body.has("message"))
                    throw new Exception("Missing message field");
                final String message = body.getString("message");
                final JSONObject jsonObject = new JSONObject();
                jsonObject.put("message", message);
                return (jsonObject.toString());
            } catch (Exception e) {
                res.status(500);
                return (e.getMessage());
            }
        });

        // GET Message
        Spark.get("/get-message/:message", (req, res) -> {
            try {
                final String message = req.params(":message");
                final JSONObject jsonObject = new JSONObject();
                jsonObject.put("message", message);
                return (jsonObject.toString());
            } catch (Exception e) {
                res.status(500);
                return (e.getMessage());
            }
        });

        // Cookie message
        Spark.get("/cookie-message", (req, res) -> {
            try {
                final String message = req.cookie("message");
                if (message == null)
                    throw new Exception("Missing message cookie");
                final JSONObject jsonObject = new JSONObject();
                jsonObject.put("message", message);
                return (jsonObject.toString());
            } catch (Exception e) {
                res.status(500);
                return (e.getMessage());
            }
        });

        // Query message
        Spark.get("/query-message", (req, res) -> {
            try {
                final String message = req.queryParams("message");
                if (message == null)
                    throw new Exception("Missing message query");
                final JSONObject jsonObject = new JSONObject();
                jsonObject.put("message", message);
                return (jsonObject.toString());
            } catch (Exception e) {
                res.status(500);
                return (e.getMessage());
            }
        });


        // Private route
        Spark.before("/private", new AuthFilter());
        Spark.get("/private", (req, res) -> "Private route");

    }

}
