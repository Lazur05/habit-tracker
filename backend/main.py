from datetime import date
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from database import engine, SessionLocal, Base
from models import Habit, HabitLog
from schemas import HabitCreate, HabitResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def habit_to_response(habit: Habit, db: Session) -> HabitResponse:
    today = date.today()
    completed_today = db.query(HabitLog).filter(
        HabitLog.habit_id == habit.id,
        HabitLog.completed_date == today
    ).first() is not None

    return HabitResponse(
        id=habit.id,
        name=habit.name,
        category=habit.category,
        created_at=habit.created_at,
        completed_today=completed_today,
    )

@app.get("/habits", response_model=List[HabitResponse])
def get_habits(db: Session = Depends(get_db)):
    habits = db.query(Habit).all()
    return [habit_to_response(h, db) for h in habits]

@app.post("/habits", response_model=HabitResponse)
def create_habit(habit: HabitCreate, db: Session = Depends(get_db)):
    new_habit = Habit(name=habit.name, category = habit.category)
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return habit_to_response(new_habit, db)

@app.post('/habits/{habit_id}/complete', response_model=HabitResponse)
def complete_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    today = date.today()
    existing = db.query(HabitLog).filter(
        HabitLog.habit_id == habit.id,
        HabitLog.completed_date == today
    ).first()

    if not existing:
        log = HabitLog(habit_id=habit_id, completed_date=today)
        db.add(log)
        db.commit()

    return habit_to_response(habit, db)

@app.delete('/habits/{habit_id}/complete', response_model=HabitResponse)
def uncomplete_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    today = date.today()
    db.query(HabitLog).filter(
        HabitLog.habit_id == habit.id,
        HabitLog.completed_date == today
    ).delete()
    db.commit()

    return habit_to_response(habit, db)

