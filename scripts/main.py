from fastapi import FastAPI
import logging
from tdb import TINYDB

app = FastAPI()
logger = logging.getLogger("DEFAULT_LOGGER")


@app.get("/")
async def root():
    logger.info("root api triggered")
    tiny.insert({"event":"root_call"})
    return {"message": "Hello World"}

if __name__=="__main__":
    config = configuration.load_config()
    configuration.setup_logger(config)
    tiny = TINYDB()

