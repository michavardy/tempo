from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from  scripts.configuration import load_config,setup_logger
from scripts.tdb import TINYDB
from pydantic import BaseModel
from datetime import datetime


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



config = load_config()
setup_logger(config)
logger = logging.getLogger("DEFAULT_LOGGER")
tiny = TINYDB()
logger.info("init webapp")


@app.get("/")
async def root():
    logger.info("root api triggered")
    tiny.insert({"event":"root_call"})
    return {"message": "Hello World"}

class Task(BaseModel):
    task_event_id: int
    task_id: int
    task_name: str
    task_status: str
    task_priority: str
    timeStamp: int
    task_active: bool


@app.post("/log_task")
async def log_task(task: Task):
    logger.info(f"task recieved {(dict(task))}")
    tiny.insert(dict(task))
    return task

@app.get("/all_tasks/")
async def all_tasks():
    logger.info("get all tasks")
    db_all = tiny.get_all()
    return db_all



