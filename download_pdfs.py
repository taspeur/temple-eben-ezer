import os
import urllib.request

pdfs = {
    "La_Sainte_Bible_LSG.pdf": "https://ebible.org/pdf/fraLSG/fraLSG_all.pdf",
    "Voyage_du_Pelerin.pdf": "http://www.samizdat.qc.ca/publications/pdf/VoyageP_Bunyan.pdf",
    "Le_Petit_Catechisme_Luther.pdf": "https://www.mediathequechretienne.fr/wp-content/uploads/2018/11/Luther_Le_petit_catechisme.pdf",
    "Marches_par_l_Esprit.pdf": "http://www.samizdat.qc.ca/publications/pdf/MarcheEsprit_MB.pdf",
    "La_Priere_Fervente.pdf": "http://www.samizdat.qc.ca/publications/pdf/PriereFervente.pdf"
}

os.makedirs('bibliotheque', exist_ok=True)

for name, url in pdfs.items():
    path = os.path.join('bibliotheque', name)
    try:
        print(f"Téléchargement de {name} depuis {url}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as response, open(path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Succès: {name}")
    except Exception as e:
        print(f"Échec pour {name}: {e}")
