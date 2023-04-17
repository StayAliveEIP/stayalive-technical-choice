package stayalive;

import io.github.manusant.ss.SparkSwagger;
import io.github.manusant.ss.conf.Options;
import org.json.JSONObject;
import spark.Service;
import spark.Spark;
import stayalive.endpoint.MessageEndpoint;
import stayalive.filter.AuthFilter;

import java.io.IOException;

import static spark.Spark.port;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws IOException {
        Service spark = Service.ignite()
                .ipAddress("0.0.0.0")
                .port(8080);

        Options options =  Options.defaultOptions()
                .confPath(SparkSwagger.CONF_FILE_NAME)
                .enableStaticMapping(true)
                .version("1.0.2")
                .build();

        // Access to the doc: http://localhost:8080/index.html
        SparkSwagger sparkSwagger = SparkSwagger.of(spark, options);
        sparkSwagger.endpoint(new MessageEndpoint());
        sparkSwagger.generateDoc();

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
