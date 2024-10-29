
from fastapi import HTTPException, status, Depends
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from models import User
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
fake_sessions = {}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.name == username).first()

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    user = get_user(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def create_session(user_id: int) -> str:
    token = f"session_{user_id}"
    fake_sessions[token] = user_id
    return token

def get_current_user_from_session(token: str, db: Session = Depends()) -> User:
    user_id = fake_sessions.get(token)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session token")
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user