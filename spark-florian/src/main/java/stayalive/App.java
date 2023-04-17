package stayalive;

import io.github.manusant.ss.SparkSwagger;
import io.github.manusant.ss.conf.Options;
import io.github.manusant.ss.descriptor.MethodDescriptor;
import org.json.JSONObject;
import spark.*;
import stayalive.endpoint.MessageEndpoint;
import stayalive.filter.AuthFilter;

import java.io.IOException;
import java.util.Collections;

import static io.github.manusant.ss.descriptor.EndpointDescriptor.endpointPath;
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
                .port(80);

        Options options =  Options.defaultOptions()
                .confPath(SparkSwagger.CONF_FILE_NAME)
                .version("1.0.2")
                .build();

        // Access to the doc: http://localhost:8080/index.html
        SparkSwagger sparkSwagger = SparkSwagger.of(spark, options);
        sparkSwagger.endpoint(endpointPath("/"), (req, res) -> {
                    System.out.println("Message endpoint");
                })
                // endpoint methods
                .get(MethodDescriptor.Builder.newBuilder()
                        // Method path
                        .withPath("hello")
                        // Method description
                        .withDescription("Clear Thor network resources")
                        // Specify response type
                        .withGenericResponse(), (request, response) -> "Hello World");
        sparkSwagger.endpoint(endpointPath("/post-message"), (req, res) -> {
                    System.out.println("Message endpoint");
                })
                // endpoint methods
                .post(MethodDescriptor.Builder.newBuilder()
                        // Method path
                        .withPath("/post-message")
                        // Method description
                        .withDescription("Return the message from the JSON body")
                        // Specify response type
                        .withGenericResponse(), (request, response) -> "{message: \"your message\"}");
        sparkSwagger.endpoint(endpointPath("/get-message"), (req, res) -> {
                    System.out.println("Message endpoint");
                })
                .get(MethodDescriptor.Builder.newBuilder()
                        // Method path
                        .withPath("/get-message/:message")
                        // Method description
                        .withDescription("Return the message from the JSON body")
                        // Specify response type
                        .withGenericResponse(), (request, response) -> "{message: \"your message\"}");
        sparkSwagger.endpoint(endpointPath("/cookie-message"), (req, res) -> {
                    System.out.println("Message endpoint");
                })
                .get(MethodDescriptor.Builder.newBuilder()
                        // Method path
                        .withPath("/cookie-message")
                        // Method description
                        .withDescription("Return the message from the JSON body")
                        // Specify response type
                        .withGenericResponse(), (request, response) -> "{message: \"your message\"}");
        sparkSwagger.endpoint(endpointPath("/query-message"), (req, res) -> {
                    System.out.println("Message endpoint");
                })
                .get(MethodDescriptor.Builder.newBuilder()
                        // Method path
                        .withPath("/query-message")
                        // Method description
                        .withDescription("Return the message from the JSON body")
                        // Specify response type
                        .withGenericResponse(), (request, response) -> "{message: \"your message\"}");
        sparkSwagger.endpoint(endpointPath("/private"), (req, res) -> {
                    System.out.println("Message endpoint");
                })
                .get(MethodDescriptor.Builder.newBuilder()
                        // Method path
                        .withPath("/private")
                        // Method description
                        .withDescription("Return the message from the JSON body")
                        // Specify response type
                        .withGenericResponse(), (request, response) -> "{message: \"your message\"}");
        sparkSwagger.generateDoc();

        // Message
        spark.get("/hello", (req, res) -> ("Hello World !"));

        // POST Message
        spark.post("/post-message", (req, res) -> {
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
        spark.get("/get-message/:message", (req, res) -> {
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
        spark.get("/cookie-message", (req, res) -> {
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
        spark.get("/query-message", (req, res) -> {
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
        spark.before("/private", new AuthFilter());
        spark.get("/private", (req, res) -> "Private route");
    }

}
