from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HabitCreate(BaseModel):
    name: str
    category: Optional[str] = None
    
class HabitResponse(BaseModel):
    id: int
    name: str
    category: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True