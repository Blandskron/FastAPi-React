
from fastapi import FastAPI, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
import models
import schemas
import auth
from database import SessionLocal, init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Blandskron",
    description="Esta es una API para el manejo de usuarios en mi aplicación web.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/register/", response_model=schemas.UserInDB)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = auth.get_user(db, username=user.name)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(name=user.name, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login/")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    authenticated_user = auth.authenticate_user(db, user.name, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    session_token = auth.create_session(authenticated_user.id)
    return {"session_token": session_token}

@app.get("/users/me/", response_model=schemas.UserInDB)
def read_users_me(request: Request, db: Session = Depends(get_db)):
    session_token = request.headers.get("Authorization")
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No session token provided")
    current_user = auth.get_current_user_from_session(session_token, db)
    return current_user

@app.put("/users/me/", response_model=schemas.UserInDB)
def update_user_me(request: Request, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    session_token = request.headers.get("Authorization")
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No session token provided")
    current_user = auth.get_current_user_from_session(session_token, db)
    
    for var, value in vars(user_update).items():
        if value is not None:
            setattr(current_user, var, value)
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user