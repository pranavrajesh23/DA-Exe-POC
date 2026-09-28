from backend.repositories.battery_assets_repository import (
    fetch_battery_assets_summary,
    fetch_battery_assets_detail,
)


def get_battery_assets_summary(user_token: str):
    return fetch_battery_assets_summary(user_token)


def get_battery_assets_detail(user_token: str, limit: int = 500):
    columns, rows = fetch_battery_assets_detail(user_token, limit)
    return {
        "columns": columns,
        "rows": [dict(zip(columns, row)) for row in rows],
    }
