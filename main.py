# бот для создания проектов
# удалять проекты
from aiogram import Bot, Dispatcher, types, F
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, LabeledPrice
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.filters import Command
import aiogram
import os
from src.python.handlers import bot, dp
import asyncio

async def main():
    try:
        print("[INFO] Бот запускается...")
        await dp.start_polling(bot)
    finally:
        await bot.session.close()

if __name__ == "__main__":
    asyncio.run(main())