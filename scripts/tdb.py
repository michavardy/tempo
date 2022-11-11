from tinydb import TinyDB, Query
import logging

logger = logging.getLogger("DEFAULT_LOGGER")

class TINYDB():
    # read doc: https://tinydb.readthedocs.io/_/downloads/en/latest/pdf/
    def __init__(self, db_name="db.json"):
        self.db_name = db_name
        self.db = TinyDB(db_name)
        logger.info("init_tiny_db")

    def insert(self, dict):
        logger.info(f"inserting data: {dict}")
        self.db.insert(dict)
    
    def get_all(self):
        logger.info('get all data')
        return self.db.all()



if __name__ == "__main__":
    pass

