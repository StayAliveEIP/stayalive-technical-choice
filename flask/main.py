from flask import Flask, request, abort
from flasgger import Swagger

app = Flask(__name__)
swagger = Swagger(app)


@app.route('/')
def hello_world():
    """Hello world endpoint
    ---
    tags:
      - Hello world
    responses:
        200:
            description: Hello world
    """
    return 'Hello, World!'


@app.route('/query')
def query_params():
    """Query parameters endpoint
    ---
    tags:
        - Query parameters
    parameters:
        - name: name
          in: query
          type: string
          required: true
        - name: age
          in: query
          type: integer
          required: true
    responses:
        200:
            description: Hello + name + age
    """
    name = request.args.get('name')
    age = request.args.get('age')
    return f'Hello, {name}, you are {age} years old.'


@app.route('/', methods=['POST'])
def hello_name():
    """Hello name endpoint
    ---
    tags:
        - Post request
    parameters:
        - name: name
          in: body
          type: string
          required: true
    responses:
        200:
            description: Hello + name
    """
    data = request.json
    name = data['name']
    return f'Hello, {name}!'


@app.route('/cookie')
def hello_cookie():
    """Hello cookie endpoint
    ---
    tags:
        - Cookies
    parameters:
        - name: name
          in: cookie
          type: string
          required: true
    responses:
        200:
            description: Hello + name
    """
    name = request.cookies.get('name')
    if name:
        return f'Hello, {name}!'
    else:
        return 'No name found in cookie.'


def check_cooked_chicken(func):
    def wrapper(*args, **kwargs):
        cooked = request.json.get('cooked')
        if not cooked:
            abort(400, description='Chicken is not cooked.')
        return func(*args, **kwargs)

    return wrapper


@app.route('/chicken', methods=['POST'])
@check_cooked_chicken
def eat_chicken():
    """Eat chicken endpoint
    ---
    tags:
        - Middleware test
    parameters:
        - name: cooked
          in: body
          type: boolean
          required: true
    responses:
        200:
            description: Yum!
    """
    return 'Yum!'


if __name__ == '__main__':
    app.run(port=8081)
