

def handler(event, context):
    print('hello')
    x = 1
    return {
        "statusCode": 200,
        "body": '{"hello":"world"}'
    }
