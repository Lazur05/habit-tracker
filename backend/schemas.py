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
    streak: int = 0

    class Config:
        from_attributes = True

class HabitLogResponse(BaseModel):
    id: int
    completed_date: date

    class Config:
        from_attributes = True

class HeatmapEntry(BaseModel):
    date: date
    count: int

class UserCreate(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes: True

class Token(BaseModel):
    access_token: str
    token_type: str