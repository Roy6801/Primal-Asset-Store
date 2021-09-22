cd api
pip3 install virtualenv
virtualenv venv
start cmd /c venv\\Scripts\\pip3 install -r requirements.txt & venv\\Scripts\\python manage.py migrate
cd ../primal-asset-store
start cmd /c npm install
cd ..
