from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    last_name: Optional[str] = None
    address: Optional[str] = None
    profile_picture: Optional[str] = None

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    name: str
    password: str

class UserUpdate(BaseModel):
    last_name: Optional[str] = None
    address: Optional[str] = None
    profile_picture: Optional[str] = None

class UserInDB(UserBase):
    email: EmailStr

    class Config:
        orm_mode = True