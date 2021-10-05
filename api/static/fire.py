from dotenv import load_dotenv, find_dotenv
import pyrebase
import os

load_dotenv(find_dotenv())
firebaseConfig = {
    "apiKey": os.getenv("apiKey"),
    "authDomain": os.getenv("authDomain"),
    "databaseURL": os.getenv("databaseURL"),
    "projectId": os.getenv("projectId"),
    "storageBucket": os.getenv("storageBucket"),
    "messagingSenderId": os.getenv("messagingSenderId"),
    "appId": os.getenv("appId"),
    "measurementId": os.getenv("measurementId")
}
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
storage = firebase.storage()
auth = firebase.auth()


class FireAPI:
    def __init__(self):
        self.remote_dir = "assets"
        self.base_dir = os.path.abspath("static/media")
        print("Connected")

    def uploadAsset(self, assetInfo):
        global db, storage, auth
        user = auth.sign_in_with_email_and_password(
            os.getenv("admin_email"), os.getenv("admin_password"))
        try:
            version = assetInfo['version'].replace(".", "_")
            asset_dir = os.path.join(self.base_dir, assetInfo['assetId'])
            for file in os.listdir(asset_dir):
                url = storage.child(self.remote_dir).child(
                    assetInfo['assetId']).child(version).child(file).put(
                        os.path.join(asset_dir, file), user['idToken'])
                downloadUrl = storage.child(self.remote_dir).child(
                    assetInfo['assetId']).child(version).child(file).get_url(
                        url['downloadTokens'])
                db.child(self.remote_dir).child(assetInfo['assetId']).push({
                    'file':
                    file,
                    'url':
                    downloadUrl
                })

            db.child(self.remote_dir).child(
                assetInfo['assetId']).child("version").set(version)
            for file in os.listdir(asset_dir):
                os.remove(os.path.join(asset_dir, file))
            os.rmdir(asset_dir)
            return downloadUrl
        except Exception as e:
            print(e)
            return False
