
#POBLAR LA TABLA TASTE
##CORRER CON  python populate_data.py

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'frent.settings')
django.setup()

from users.models import Like

def populate_data():
    gustos = [
        'Jugar videojuegos',
        'Pasear',
        'Cocinar',
        'Ver películas',
        "Leer",
        "Cantar",
        "Bailar",
        "Karaoke",
        "Football",
        "Anime",
        "Dibujar",
        "Tocar Guitarra",
        "Arte",
        "Animales",
        "Natacion",
        "Hacer ejercicio",
        "Programar",
        "Viajar",
        "Escuchar música",
        "Escribir",
        "Fotografía",
        "Jardinería",
        "Meditar",
        "Ciclismo",
        "Voluntariado",
        "Aprender idiomas",
    ]

    for gusto in gustos:
        instancia_gusto = Like(name=gusto)
        instancia_gusto.save()

if __name__ == '__main__':
    print("Poblando la base de datos con datos iniciales...")
    populate_data()
    print("¡Datos iniciales poblados exitosamente!")
