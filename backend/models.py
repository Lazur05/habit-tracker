from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=False), server_default=func.now())

    logs = relationship("HabitLog", back_populates='habit', cascade='all, delete-orphan')

class HabitLog(Base):
    __tablename__ = 'habit_logs'

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"), nullable=False)
    completed_date = Column(Date, nullable=False)
    habit = relationship("Habit", back_populates='logs')

    __table_args__ = (
        UniqueConstraint('habit_id', 'completed_date', name='unique_habit_date'),
    )


    