from repositories.connection import get_connection


def fetch_sales_sample(user_token: str, limit: int = 500):
    query = f"SELECT * FROM samples.bakehouse.sales_transactions LIMIT {limit}"
    with get_connection(user_token) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            columns = [c[0] for c in cursor.description]
            rows = cursor.fetchall()
            return columns, rows


def fetch_sales_by_product(user_token: str):
    query = """
        SELECT product, SUM(totalPrice) AS total_sales, COUNT(*) AS order_count
        FROM samples.bakehouse.sales_transactions
        GROUP BY product
        ORDER BY total_sales DESC
    """
    with get_connection(user_token) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            columns = [c[0] for c in cursor.description]
            rows = cursor.fetchall()
            return columns, rows