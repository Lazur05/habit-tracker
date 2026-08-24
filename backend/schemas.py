from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional, List

class HabitCreate(BaseModel):
    name: str
    category: Optional[str] = None
    
class HabitResponse(BaseModel):
    id: int
    name: str
    category: Optional[str]
    created_at: datetime
    completed_today: bool = False

    class Config:
        from_attributes = True

class HabitLogResponse(BaseModel):
    id: int
    completed_date: date

    class Config:
        from_attributes = True