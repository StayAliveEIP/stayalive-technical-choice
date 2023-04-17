package stayalive.endpoint;

import io.github.manusant.ss.SparkSwagger;
import io.github.manusant.ss.rest.Endpoint;
import io.github.manusant.ss.route.Route;
import spark.Request;
import spark.Response;
import stayalive.message.Message;

import static io.github.manusant.ss.descriptor.EndpointDescriptor.endpointPath;
import static io.github.manusant.ss.descriptor.MethodDescriptor.path;
import static io.github.manusant.ss.rest.RestResponse.ok;

public class MessageEndpoint implements Endpoint {

    private static final String NAME_SPACE = "/message";

    @Override
    public void bind(final SparkSwagger restApi) {

        restApi.endpoint(
                endpointPath(NAME_SPACE + "/post").withDescription("Hammer REST API exposing all Message utilities"), (q, a) -> {
                    System.out.println("Message endpoint");
                }).post(path("/post")
                        .withDescription("Return the message from the JSON body")
                        .withResponseType(Message.class), new Route() {
                    @Override
                    public Object onRequest(Request request, Response response) {
                        System.out.println("POST Message");
                        final Message network = new Message("Network Data");

                        return ok(response, network.toString());
                    }
                });
    }
}
