import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


class User(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String)
    task_status = Column(String)
    task_priority = Column(String)
    time_started = Column(DateTime(timezone=True), server_default=func.now())

    items = relationship("Item", back_populates="owner")


