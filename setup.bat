cd api
virtualenv venv
start cmd /c venv\\Scripts\\pip3 install -r requirements.txt
cd ../primal-asset-store
start cmd /c npm install
cd ..
