import logging
import configparser

def load_config(config_name='scripts/config.ini'):
    config = configparser.ConfigParser()
    config.read(config_name)
    return config

def setup_logger(config, logger_name="DEFAULT_LOGGER"):
    # create logger with 'spam_application'
    logger = logging.getLogger(logger_name)
    level = logging.getLevelName(config['logging']['level'])
    logger.setLevel(level)
    # create file handler which logs even debug messages
    file_handler = logging.FileHandler(logger_name)
    file_handler.setLevel(level)
    # create console handler with a higher log level
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)
    # create formatter and add it to the handlers
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    # add the handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    logger.info('init logger')


if __name__ == "__main__":
    config = load_config()
    setup_logger(config)