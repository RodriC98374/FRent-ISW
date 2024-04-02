# FRent-ISW - Backend 🖥️

[![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)](https://github.com/RodriC98374/FRent-ISW)

## Descripción 📜

Proyecto para la materia de Ingeniería de Software de la Universidad Mayor de San Simón

## Requisitos 🔧

Para ejecutar el proyecto correctamente, se debe tener instalado previamente:

* Python 3.12
* Pip 24
* PostgreSQL

Adicionalmente, se debe tener una base de datos en PostgreSQL con el nombre de:

* frent

## Instalación 💾

Para instalar el backend del proyecto, se necesita crear un entorno virtual en la carpeta raíz:

```bash
python -m venv venv
```

Posterior a eso, se debe activar el entorno virtual:

```bash
venv/Scripts/activate
```

Una vez activado el entorno virtual (debe aparecer "(venv)" al inicio de cada comando en la consola), se deben instalar las dependencias del archivo "requirements.txt":

```bash
pip install -r requirements.txt
```

Ahora solo queda hacer las migraciones:

```bash
python manage.py migrate
```

Ahora para poblar una de las tablas de la base de datos:

```bash
python populate_data.py
```

Y el servidor (por defecto establecido en el puerto 8000) ya puede correr:

```bash
python manage.py runserver
```

## Información adicional 🤓

Para acceder al panel de administración de django (http://localhost:8000/admin), se debe tener una cuenta de superusuario registrada:

```bash
python manage.py createsuperuser
```
Solamente se llenan los campos requeridos y será capaz de logearse en el panel de administrador.
