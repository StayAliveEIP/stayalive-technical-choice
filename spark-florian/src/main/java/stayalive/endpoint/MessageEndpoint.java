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

    private static final String NAME_SPACE = "/hammer";

    @Override
    public void bind(final SparkSwagger restApi) {

        restApi.endpoint(endpointPath(NAME_SPACE)
                        .withDescription("Hammer REST API exposing all Thor utilities "), (q, a) -> {
                        System.out.println("Hammer Endpoint");
                })

                .get(path("/message")
                        .withDescription("Gets the whole Network")
                        .withSecurity("thor_api_key")
                        .withHeaderParam().withName("x-export-kpi").withDescription("Export KPI Header").withRequired(true)
                        .and()
                        .withCookieParam().withName("my-cookie-data")
                        .and()
                        .withResponseType(Message.class), new Route() {
                    @Override
                    public Object onRequest(Request request, Response response) {

                        Message network = new Message("Network Data");

                        return ok(response, network);
                    }
                });
    }
}
