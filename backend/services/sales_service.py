from repositories.sales_repository import fetch_sales_sample, fetch_sales_by_product


def get_sales_sample(user_token: str, limit: int = 500):
    columns, rows = fetch_sales_sample(user_token, limit)
    return {
        "columns": columns,
        "rows": [dict(zip(columns, row)) for row in rows],
    }


def get_sales_by_product(user_token: str):
    columns, rows = fetch_sales_by_product(user_token)
    return {
        "columns": columns,
        "rows": [dict(zip(columns, row)) for row in rows],
    }