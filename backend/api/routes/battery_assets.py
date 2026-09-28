from fastapi import APIRouter, Depends

from backend.core.auth import get_current_user_token
from backend.services.battery_assets_service import (
    get_battery_assets_summary,
    get_battery_assets_detail,
)

router = APIRouter()


@router.get("/api/battery-assets-summary")
async def battery_assets_summary(user_token: str = Depends(get_current_user_token)):
    return get_battery_assets_summary(user_token)


@router.get("/api/battery-assets-detail")
async def battery_assets_detail(user_token: str = Depends(get_current_user_token)):
    return get_battery_assets_detail(user_token)
