from fastapi import APIRouter

from backend.core.logging_config import logger

router = APIRouter()


@router.get("/api/health")
async def health_check():
    logger.info("Health check at /api/health")
    return {"status": "healthy"}