from fastapi import APIRouter, Depends

from backend.core.auth import get_current_user_token
from backend.services.sales_service import get_sales_sample, get_sales_by_product

router = APIRouter()


@router.get("/api/sales-sample")
async def sales_sample(user_token: str = Depends(get_current_user_token)):
    return get_sales_sample(user_token)


@router.get("/api/sales-by-product")
async def sales_by_product(user_token: str = Depends(get_current_user_token)):
    return get_sales_by_product(user_token)