from fastapi import APIRouter, Depends

from core.auth import get_current_user_token

router = APIRouter()


@router.get("/api/whoami")
async def whoami(user_token: str = Depends(get_current_user_token)):
    # user_token is available here if this route ever needs to make a
    # Databricks call using the signed-in user's identity
    return {"authenticated": True}