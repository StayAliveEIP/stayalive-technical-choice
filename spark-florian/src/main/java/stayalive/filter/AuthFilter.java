package stayalive.filter;

import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

public class AuthFilter implements Filter {

    @Override
    public void handle(Request request, Response response) {
        try {
            final String token = request.headers("Authorization");
            if (token == null || !token.equals("password")) {
                response.status(401);
                response.body("Unauthorized");
                response.type("application/json");
                Spark.halt();
            }
        } catch (Exception e) {
            response.status(500);
            response.body(e.getMessage());
            response.type("application/json");
            Spark.halt();
        }

    }
}
