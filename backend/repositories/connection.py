import os
from databricks import sql

from core.config import cfg


def get_connection(user_token: str):
    return sql.connect(
        server_hostname=cfg.host,
        http_path=f"/sql/1.0/warehouses/{os.getenv('DATABRICKS_WAREHOUSE_ID')}",
        access_token=user_token,
    )