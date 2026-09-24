import os
from fastapi import Request, HTTPException

from .logging_config import logger


def get_current_user_token(request: Request) -> str:
    """
    FastAPI dependency — resolves the signed-in user's own access token (OBO),
    forwarded by Databricks' app gateway in production. Locally, that header
    doesn't exist, so we fall back to a personal token from .env -- but only
    if LOCAL_DEV is explicitly set, so this can never silently activate in a
    deployed environment.

    Use via: user_token: str = Depends(get_current_user_token)
    """
    user_token = request.headers.get("x-forwarded-access-token")

    if not user_token:
        if os.getenv("LOCAL_DEV") == "true":
            user_token = os.getenv("DATABRICKS_TOKEN")
            logger.info("LOCAL_DEV active — using DATABRICKS_TOKEN from .env instead of OBO header")
        else:
            raise HTTPException(status_code=401, detail="Missing user authorization token")

    if not user_token:
        raise HTTPException(status_code=401, detail="No valid Databricks token available")

    return user_token