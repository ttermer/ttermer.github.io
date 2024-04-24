import os
import json

# Define the directory path and the file types
directory_path = './src/ObjetosJuego'
file_types = ('.png', '.jpg', '.jpeg', '.gif')

# Get a list of all directories in the directory_path
directories = [d for d in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, d))]

for directory in directories:
    files = [f for f in os.listdir(os.path.join(directory_path, directory)) if f.endswith(file_types)]
    files.sort()
    file_path = os.path.join(directory_path, directory, 'files.json')
    with open(file_path, 'w') as json_file:
        json.dump(files, json_file)

print('Files written to disk')