from django.db import connection
from .common import Repeated

class DB():
    def __init__(self):
        pass

    def fullcycle(self, param):
        try:
            query = """EXEC SP_User NULL, '{ "Flag": 1 , "fname": "Charls", "lname": "Catipay",
                       "mname": "Bajenting", "age": "23", "gender": "1"
             }'"""
            print(f"Query: {query}")
            query2 = f"""EXEC SP_User NULL, '{param}'"""
            print(f"Query2: {query2}")
            with connection.cursor() as cursor:
                cursor.execute(query2)
                row = Repeated.dictfetchall(cursor)
                print(f'Row: {row}')
                return row

        except Exception as ex:
            return JsonResponse(ex, safe=False)