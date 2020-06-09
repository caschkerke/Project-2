# This is a script intended to circumvent the issues surrounding Github's file size cap.
# By making use of the dropbox API, the hosted datasets are downloaded locally, and placed within the appropriate file directory.
# This script must be executed before all other code, otherwise the datasets will not be present within the directory, and code will fail to execute.
# It is possible to rerun this code without first clearing the /data folder in the directory as the currently present files will simply be replaced as long as the initial names have remained the same.
import dropbox
from config import API_KEY

# Before running this code, ensure you've created a config.py file with a working API key.
dbx = dropbox.Dropbox(API_KEY)

# The lines below perform the download calls for each year's dataset using functions present in the imported dropbox package.
with open("data/database_2016.sqlite", "wb") as f:
    metadata, res = dbx.files_download(path="/Data/database_2016.sqlite")
    f.write(res.content)

with open("data/database_2017.sqlite", "wb") as f:
    metadata, res = dbx.files_download(path="/Data/database_2017.sqlite")
    f.write(res.content)

with open("data/database_2018.sqlite", "wb") as f:
    metadata, res = dbx.files_download(path="/Data/database_2018.sqlite")
    f.write(res.content)

with open("data/database_2019.sqlite", "wb") as f:
    metadata, res = dbx.files_download(path="/Data/database_2019.sqlite")
    f.write(res.content)

print("Download complete! Feel free to begin further operations using the datasets.")