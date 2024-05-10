import os

from fastapi	import APIRouter, HTTPException
from pydantic 	import BaseModel
from bson		import ObjectId
from chain		import ChainV1, ChainV2, ChainV3
from app.util	import redis_instance
from app.util	import connection

router = APIRouter(prefix="/connect", tags=["connect"])

class ConnectRequest(BaseModel):
	template_id: int

class ConnectResponse(BaseModel):
	connection_id: str

@router.post("/{version}", response_model=ConnectResponse)
async def connect(version: str, request: ConnectRequest):
	if version not in ["v1", "v2", "v3"]:
		raise HTTPException(status_code=400, detail="Bad Request")
	connection_id = str(ObjectId())
	connection[connection_id] = {
		version: version,
		template_id: request.template_id
	}

	return ConnectResponse(connection_id=connection_id)