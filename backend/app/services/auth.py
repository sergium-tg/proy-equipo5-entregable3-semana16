from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Optional

from app.db.session import get_db
from app.models import models, schemas
from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

# para el hashing con bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# ruta del token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

class AuthService:

    # revisa si coincide la pass plana con el hash
    @staticmethod
    def revisa_pass(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    # para convertir pass plana a hash
    @staticmethod
    def alista_hash(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def alista_nombre(db: Session, username: str) -> Optional[models.User]:
        return db.query(models.User).filter(models.User.username == username).first()

    @staticmethod
    def autentica(db: Session, username: str, password: str) -> Optional[models.User]:
        user = AuthService.alista_nombre(db, username)
        if not user:
            return None
        if not AuthService.revisa_pass(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def crea_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    @staticmethod
    def regist(db: Session, user: schemas.UserCreate) -> models.User:
        # crea usuario en la BD
        if AuthService.alista_nombre(db, user.username):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="El nombre de usuario ya existe",
            )
        
        hashed_password = AuthService.alista_hash(user.password)
        db_user = models.User(
            username=user.username,
            hashed_password=hashed_password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def revisa_usuario(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudieron validar las credenciales",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = schemas.TokenData(username=username)
        except JWTError:
            raise credentials_exception
        
        user = AuthService.alista_nombre(db, username=token_data.username)
        if user is None:
            raise credentials_exception
        
        if user.disabled:
             raise HTTPException(status_code=400, detail="Usuario inactivo")

        return user