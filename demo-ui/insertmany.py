from pymongo import MongoClient 
  
  
myclient = MongoClient("mongodb://localhost:27017/")
  
# database 
db = myclient["Automobile"]
  
# Created or Switched to collection 
# names: GeeksForGeeks
collection = db["cars"]
  
# Creating a list of records which we 
# insert in the collection using the
# update_many() method.
mylist = [
    {
        "title": "812 Superfast",
        "url": "https://www.ferrari.com/auto/812-superfast",
        "intro_text": "The first and most difficult challenge Ferrari always faces when it decides to develop a new model is to push the boundaries of its own achievements yet again. This challenge is made all the tougher when the task at hand involves designing a new 12-cylinder engine, the power unit that hailed the start of the glorious Prancing Horse story 70 years ago in 1947. On this occasion, intensive research and development focused on exploiting Ferrari’s wealth of track-derived engineering know-how has produced the 812 Superfast, designed to offer its drivers both benchmark performance across the board and the most riveting and rewarding driving experience possible. With its output boosted to 800 cv, 60 more than the F12berlinetta, the 812 Superfast is the most powerful and fastest road-going Ferrari ever built (with the exception, of course, of the rear-engined special limited-series 12-cylinders). The 812 Superfast thus ushers in a new era in Ferrari 12-cylinder history, and, in doing so, builds on the invaluable legacies of the F12berlinetta and F12tdf. To make full use of that huge power and to guarantee perfect weight distribution, the car exploits a highly evolved transaxle architecture that couples a front-mounted engine with a rear-mounted transmission. It is also the first Ferrari equipped with EPS (Electric Power Steering).",
        "images": [
            "http://localhost:5000/static/812-superfast-2.jpg",
            "http://localhost:5000/static/812-superfast.jpg"
        ],
        "Engine": {
            "Type": "V12 - 65°",
            "Overall displacement": "6496",
            "Bore and stroke": "94x78",
            "Max power output*": "588 kW (800 cv) at 8,500 rpm",
            "Max torque*": "718 Nm at 7,000 rpm",
            "Max engine speed": "8900",
            "Compression ratio": "13,6:1"
        },
        "Dimension and weight": {
            "Length": "4,657",
            "Width": "1,971",
            "Height": "1,276",
            "Wheelbase": "2,720",
            "Front track": "1,672",
            "Rear track": "1,645",
            "Kerb weight**": "1,630",
            "Dry weight**": "1,525",
            "Weight distribution": "47% front - 53% rear",
            "Fuel tank capacity": "92"
        },
        "Wheels & tyres": {
            "Front": "275/35 ZR20; 10” J x 20”",
            "Rear": "315/35 ZR20; 11.5” J x 20”"
        },
        "Brakes": {
            "Front": "398 x 223 x 38mm",
            "Rear": "360 x 233 x 32mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": "340",
            "0-100 km/h": "2.9",
            "0-200 km/h": "7.9",
            "100-0 km/h": "32",
            "Dry weight/power": "1.9 kg"
        },
        "Fuel consumption": {
            "Low": "25,2",
            "Mid": "15,2",
            "High": "14,1",
            "Extra High": "15",
            "Combined": "16,1"
        },
        "C02 emissions": {
            "Low": "573",
            "Mid": "345",
            "High": "320",
            "Extra high": "340",
            "Combined": "366"
        },
        "type": "Sport Car",
        "raw_data": "{\"title\":\"812 Superfast\",\"url\":\"https://www.ferrari.com/auto/812-superfast\",\"intro_text\":\"The first and most difficult challenge Ferrari always faces when it decides to develop a new model is to push the boundaries of its own achievements yet again. This challenge is made all the tougher when the task at hand involves designing a new 12-cylinder engine, the power unit that hailed the start of the glorious Prancing Horse story 70 years ago in 1947. On this occasion, intensive research and development focused on exploiting Ferrari’s wealth of track-derived engineering know-how has produced the 812 Superfast, designed to offer its drivers both benchmark performance across the board and the most riveting and rewarding driving experience possible. With its output boosted to 800 cv, 60 more than the F12berlinetta, the 812 Superfast is the most powerful and fastest road-going Ferrari ever built (with the exception, of course, of the rear-engined special limited-series 12-cylinders). The 812 Superfast thus ushers in a new era in Ferrari 12-cylinder history, and, in doing so, builds on the invaluable legacies of the F12berlinetta and F12tdf. To make full use of that huge power and to guarantee perfect weight distribution, the car exploits a highly evolved transaxle architecture that couples a front-mounted engine with a rear-mounted transmission. It is also the first Ferrari equipped with EPS (Electric Power Steering).\",\"images\":[\"http://localhost:5000/static/812-superfast-2.jpg\",\"http://localhost:5000/static/812-superfast.jpg\"],\"Engine\":{\"Type\":\"V12 - 65°\",\"Overall displacement\":\"6496\",\"Bore and stroke\":\"94x78\",\"Max power output*\":\"588 kW (800 cv) at 8,500 rpm\",\"Max torque*\":\"718 Nm at 7,000 rpm\",\"Max engine speed\":\"8900\",\"Compression ratio\":\"13,6:1\"},\"Dimension and weight\":{\"Length\":\"4,657\",\"Width\":\"1,971\",\"Height\":\"1,276\",\"Wheelbase\":\"2,720\",\"Front track\":\"1,672\",\"Rear track\":\"1,645\",\"Kerb weight**\":\"1,630\",\"Dry weight**\":\"1,525\",\"Weight distribution\":\"47% front - 53% rear\",\"Fuel tank capacity\":\"92\"},\"Wheels & tyres\":{\"Front\":\"275/35 ZR20; 10” J x 20”\",\"Rear\":\"315/35 ZR20; 11.5” J x 20”\"},\"Brakes\":{\"Front\":\"398 x 223 x 38mm\",\"Rear\":\"360 x 233 x 32mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\"340\",\"0-100 km/h\":\"2.9\",\"0-200 km/h\":\"7.9\",\"100-0 km/h\":\"32\",\"Dry weight/power\":\"1.9 kg\"},\"Fuel consumption\":{\"Low\":\"25,2\",\"Mid\":\"15,2\",\"High\":\"14,1\",\"Extra High\":\"15\",\"Combined\":\"16,1\"},\"C02 emissions\":{\"Low\":\"573\",\"Mid\":\"345\",\"High\":\"320\",\"Extra high\":\"340\",\"Combined\":\"366\"},\"type\":\"Sport Car\"}"
    },
    {
        "title": "sf90 spider",
        "url": "https://www.ferrari.com/en-IN/auto/sf90-spider",
        "intro_text": "As the Prancing Horse’s first production plug-in hybrid spider, the SF90 Spider sets new performance and innovation benchmarks not only for the marque’s range, but for the entire sports car sector. The new convertible has the same extreme supercar specification and record-breaking performance as the SF90 Stradale yet also adds further driving pleasure and versatility to the mix, thanks to the latest iteration of Ferrari’s signature Retractable Hard Top architecture. This makes the SF90 Spider the ideal car for owners that demand the very pinnacle of Ferrari technology, but still want the thrill and versatility of open-top driving.",
        "images": [
            "http://localhost:5000/static/ferrari-sf90-spider.jpg",
            "http://localhost:5000/static/ferrari-sf90-spider-2.jpg"
        ],
        "Engine": {
            "Type": "V8 - 90°",
            "Overall displacement": "3990",
            "Bore and stroke": "NA",
            "Max power output*": "780 cv at 7,500 rpm",
            "Max torque*": "800 Nm at 6,000 rpm",
            "Max engine speed": "8000",
            "Compression ratio": "9,4:1"
        },
        "Dimension and weight": {
            "Length": "4,704",
            "Width": "1,973",
            "Height": "1,191",
            "Wheelbase": "2,649",
            "Front track": "1,679",
            "Rear track": "1,652",
            "Kerb weight**": "NA",
            "Dry weight**": "1,670",
            "Weight distribution": "45% front - 55% rear",
            "Fuel tank capacity": "NA"
        },
        "Wheels & tyres": {
            "Front": "255/35 ZR 20 J9,5",
            "Rear": "315/30 ZR 20 J11.5"
        },
        "Brakes": {
            "Front": "398 x 223 x 38mm",
            "Rear": "360 x 233 x 32mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": "340",
            "0-100 km/h": "2.5",
            "0-200 km/h": "7.0",
            "100-0 km/h": "29.5",
            "Dry weight/power": "1.67 kg"
        },
        "Fuel consumption": {},
        "C02 emissions": {},
        "type": "Sport Car",
        "raw_data": "{\"title\":\"sf90 spider\",\"url\":\"https://www.ferrari.com/en-IN/auto/sf90-spider\",\"intro_text\":\"As the Prancing Horse’s first production plug-in hybrid spider, the SF90 Spider sets new performance and innovation benchmarks not only for the marque’s range, but for the entire sports car sector. The new convertible has the same extreme supercar specification and record-breaking performance as the SF90 Stradale yet also adds further driving pleasure and versatility to the mix, thanks to the latest iteration of Ferrari’s signature Retractable Hard Top architecture. This makes the SF90 Spider the ideal car for owners that demand the very pinnacle of Ferrari technology, but still want the thrill and versatility of open-top driving.\",\"images\":[\"http://localhost:5000/static/ferrari-sf90-spider.jpg\",\"http://localhost:5000/static/ferrari-sf90-spider-2.jpg\"],\"Engine\":{\"Type\":\"V8 - 90°\",\"Overall displacement\":\"3990\",\"Bore and stroke\":\"NA\",\"Max power output*\":\"780 cv at 7,500 rpm\",\"Max torque*\":\"800 Nm at 6,000 rpm\",\"Max engine speed\":\"8000\",\"Compression ratio\":\"9,4:1\"},\"Dimension and weight\":{\"Length\":\"4,704\",\"Width\":\"1,973\",\"Height\":\"1,191\",\"Wheelbase\":\"2,649\",\"Front track\":\"1,679\",\"Rear track\":\"1,652\",\"Kerb weight**\":\"NA\",\"Dry weight**\":\"1,670\",\"Weight distribution\":\"45% front - 55% rear\",\"Fuel tank capacity\":\"NA\"},\"Wheels & tyres\":{\"Front\":\"255/35 ZR 20 J9,5\",\"Rear\":\"315/30 ZR 20 J11.5\"},\"Brakes\":{\"Front\":\"398 x 223 x 38mm\",\"Rear\":\"360 x 233 x 32mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\"340\",\"0-100 km/h\":\"2.5\",\"0-200 km/h\":\"7.0\",\"100-0 km/h\":\"29.5\",\"Dry weight/power\":\"1.67 kg\"},\"Fuel consumption\":{},\"C02 emissions\":{},\"type\":\"Sport Car\"}"
    },
    {
        "title": "812 GTS",
        "url": "https://www.ferrari.com/en-IN/auto/812-gts",
        "images": [
            "http://localhost:5000/static/812-gts.jpg",
            "http://localhost:5000/static/812-gts-2.jpg"
        ],
        "intro_text": "NA",
        "Engine": {
            "Type": "V12 - 65°",
            "Overall displacement": "6496",
            "Bore and stroke": "94x78",
            "Max power output*": "588 kW (800 cv) at 8,500 rpm",
            "Max torque*": "718 Nm at 7,000 rpm",
            "Max engine speed": "8900",
            "Compression ratio": "13,6:1"
        },
        "Dimension and weight": {
            "Length": "4,693",
            "Width": "1,971",
            "Height": "1,276",
            "Wheelbase": "2,720",
            "Front track": "1,672",
            "Rear track": "1,645",
            "Kerb weight**": "1,630",
            "Dry weight**": "1,525",
            "Weight distribution": "47% front - 53% rear",
            "Fuel tank capacity": "92"
        },
        "Wheels & tyres": {
            "Front": "275/35 ZR20; 10” J x 20”",
            "Rear": "315/35 ZR20; 11.5” J x 20”"
        },
        "Brakes": {
            "Front": "398 x 223 x 38mm",
            "Rear": "360 x 233 x 32mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": ">340",
            "0-100 km/h": "<3",
            "0-200 km/h": "8.3",
            "100-0 km/h": "32",
            "Dry weight/power": "NA"
        },
        "Fuel consumption": {
            "Low": "25,8",
            "Mid": "15,8",
            "High": "14,0",
            "Extra High": "15,3",
            "Combined": "16,4"
        },
        "C02 emissions": {
            "Low": "588",
            "Mid": "360",
            "High": "318",
            "Extra high": "348",
            "Combined": "373"
        },
        "type": "Sport Car",
        "raw_data": "{\"title\":\"812 GTS\",\"url\":\"https://www.ferrari.com/en-IN/auto/812-gts\",\"images\":[\"http://localhost:5000/static/812-gts.jpg\",\"http://localhost:5000/static/812-gts-2.jpg\"],\"intro_text\":\"NA\",\"Engine\":{\"Type\":\"V12 - 65°\",\"Overall displacement\":\"6496\",\"Bore and stroke\":\"94x78\",\"Max power output*\":\"588 kW (800 cv) at 8,500 rpm\",\"Max torque*\":\"718 Nm at 7,000 rpm\",\"Max engine speed\":\"8900\",\"Compression ratio\":\"13,6:1\"},\"Dimension and weight\":{\"Length\":\"4,693\",\"Width\":\"1,971\",\"Height\":\"1,276\",\"Wheelbase\":\"2,720\",\"Front track\":\"1,672\",\"Rear track\":\"1,645\",\"Kerb weight**\":\"1,630\",\"Dry weight**\":\"1,525\",\"Weight distribution\":\"47% front - 53% rear\",\"Fuel tank capacity\":\"92\"},\"Wheels & tyres\":{\"Front\":\"275/35 ZR20; 10” J x 20”\",\"Rear\":\"315/35 ZR20; 11.5” J x 20”\"},\"Brakes\":{\"Front\":\"398 x 223 x 38mm\",\"Rear\":\"360 x 233 x 32mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\">340\",\"0-100 km/h\":\"<3\",\"0-200 km/h\":\"8.3\",\"100-0 km/h\":\"32\",\"Dry weight/power\":\"NA\"},\"Fuel consumption\":{\"Low\":\"25,8\",\"Mid\":\"15,8\",\"High\":\"14,0\",\"Extra High\":\"15,3\",\"Combined\":\"16,4\"},\"C02 emissions\":{\"Low\":\"588\",\"Mid\":\"360\",\"High\":\"318\",\"Extra high\":\"348\",\"Combined\":\"373\"},\"type\":\"Sport Car\"}"
    },
    {
        "title": "SF90 Stradale",
        "url": "https://www.ferrari.com/en-IN/auto/sf90-stradale",
        "intro_text": "The car’s name encapsulates the true significance of all that has been achieved in terms of performance. The reference to the 90th anniversary of the foundation of Scuderia Ferrari underscores the strong link that has always existed between Ferrari’s track and road cars. A brilliant encapsulation of the most advanced technologies developed in Maranello, the SF90 Stradale is also the perfect demonstration of how Ferrari immediately transitions the knowledge and skills it acquires in competition to its production cars.",
        "images": [
            "http://localhost:5000/static/ferrari-sf90-stradale.jpg",
            "http://localhost:5000/static/2021-ferrari-sf90-stradale.jpg"
        ],
        "Engine": {
            "Type": "V8 - 90°",
            "Overall displacement": "3990",
            "Bore and stroke": "NA",
            "Max power output*": "780 cv at 7,500 rpm",
            "Max torque*": "800 Nm at 6,000 rpm",
            "Max engine speed": "8000",
            "Compression ratio": "9.5:1"
        },
        "Dimension and weight": {
            "Length": "4710",
            "Width": "1,972",
            "Height": "1,186",
            "Wheelbase": "2,650",
            "Front track": "1,679",
            "Rear track": "1,652",
            "Kerb weight**": "NA",
            "Dry weight**": "1,570",
            "Weight distribution": "45% front - 55% rear",
            "Fuel tank capacity": "NA"
        },
        "Wheels & tyres": {
            "Front": "255/35 ZR 20 J9,5",
            "Rear": "315/30 ZR 20 J11.5"
        },
        "Brakes": {
            "Front": "398 x 223 x 38mm",
            "Rear": "360 x 233 x 32mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": "340",
            "0-100 km/h": "2.5",
            "0-200 km/h": "6.7",
            "100-0 km/h": "<29.5m",
            "Dry weight/power": "1.57 kg"
        },
        "Fuel consumption": {},
        "C02 emissions": {},
        "type": "Sport Car",
        "raw_data": "{\"title\":\"SF90 Stradale\",\"url\":\"https://www.ferrari.com/en-IN/auto/sf90-stradale\",\"intro_text\":\"The car’s name encapsulates the true significance of all that has been achieved in terms of performance. The reference to the 90th anniversary of the foundation of Scuderia Ferrari underscores the strong link that has always existed between Ferrari’s track and road cars. A brilliant encapsulation of the most advanced technologies developed in Maranello, the SF90 Stradale is also the perfect demonstration of how Ferrari immediately transitions the knowledge and skills it acquires in competition to its production cars.\",\"images\":[\"http://localhost:5000/static/ferrari-sf90-stradale.jpg\",\"http://localhost:5000/static/2021-ferrari-sf90-stradale.jpg\"],\"Engine\":{\"Type\":\"V8 - 90°\",\"Overall displacement\":\"3990\",\"Bore and stroke\":\"NA\",\"Max power output*\":\"780 cv at 7,500 rpm\",\"Max torque*\":\"800 Nm at 6,000 rpm\",\"Max engine speed\":\"8000\",\"Compression ratio\":\"9.5:1\"},\"Dimension and weight\":{\"Length\":\"4710\",\"Width\":\"1,972\",\"Height\":\"1,186\",\"Wheelbase\":\"2,650\",\"Front track\":\"1,679\",\"Rear track\":\"1,652\",\"Kerb weight**\":\"NA\",\"Dry weight**\":\"1,570\",\"Weight distribution\":\"45% front - 55% rear\",\"Fuel tank capacity\":\"NA\"},\"Wheels & tyres\":{\"Front\":\"255/35 ZR 20 J9,5\",\"Rear\":\"315/30 ZR 20 J11.5\"},\"Brakes\":{\"Front\":\"398 x 223 x 38mm\",\"Rear\":\"360 x 233 x 32mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\"340\",\"0-100 km/h\":\"2.5\",\"0-200 km/h\":\"6.7\",\"100-0 km/h\":\"<29.5m\",\"Dry weight/power\":\"1.57 kg\"},\"Fuel consumption\":{},\"C02 emissions\":{},\"type\":\"Sport Car\"}"
    },
    {
        "title": "f8 Tributo",
        "url": "https://www.ferrari.com/en-IN/auto/f8-tributo",
        "intro_text": "The Ferrari F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse’s classic two-seater berlinetta. It is a car with unique characteristics and, as its name implies, is an homage to the most powerful V8 in Ferrari history.",
        "images": [
            "http://localhost:5000/static/ferrari_f8_tributo.jpg"
        ],
        "Engine": {
            "Type": "V8",
            "Overall displacement": "3902",
            "Bore and stroke": "NA",
            "Max power output*": "720 cv at 7200 rpm",
            "Max torque*": "770 Nm",
            "Max engine speed": "8000rpm",
            "Compression ratio": "9,6:1"
        },
        "Dimension and weight": {
            "Length": "4,611",
            "Width": "1,979",
            "Height": "1,206",
            "Wheelbase": "2,650",
            "Front track": "1,677",
            "Rear track": "1,646",
            "Kerb weight**": "1436",
            "Dry weight**": "1330",
            "Weight distribution": "47% front - 53% rear",
            "Fuel tank capacity": "78"
        },
        "Wheels & tyres": {
            "Front": "245/35ZR J9.0",
            "Rear": "305/30ZR 20 J11.0"
        },
        "Brakes": {
            "Front": "398 x 223 x 38mm",
            "Rear": "360 x 233 x 32mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": "340",
            "0-100 km/h": "2.9",
            "0-200 km/h": "7.8",
            "100-0 km/h": "32",
            "Dry weight/power": "NA"
        },
        "Fuel consumption": {
            "Low": "21,5",
            "Mid": "12,2",
            "High": "10,8",
            "Extra High": "11,8",
            "Combined": "12,9"
        },
        "C02 emissions": {
            "Low": "490",
            "Mid": "276",
            "High": "246",
            "Extra high": "267",
            "Combined": "292"
        },
        "type": "Sport Car",
        "raw_data": "{\"title\":\"f8 Tributo\",\"url\":\"https://www.ferrari.com/en-IN/auto/f8-tributo\",\"intro_text\":\"The Ferrari F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse’s classic two-seater berlinetta. It is a car with unique characteristics and, as its name implies, is an homage to the most powerful V8 in Ferrari history.\",\"images\":[\"http://localhost:5000/static/ferrari_f8_tributo.jpg\"],\"Engine\":{\"Type\":\"V8\",\"Overall displacement\":\"3902\",\"Bore and stroke\":\"NA\",\"Max power output*\":\"720 cv at 7200 rpm\",\"Max torque*\":\"770 Nm\",\"Max engine speed\":\"8000rpm\",\"Compression ratio\":\"9,6:1\"},\"Dimension and weight\":{\"Length\":\"4,611\",\"Width\":\"1,979\",\"Height\":\"1,206\",\"Wheelbase\":\"2,650\",\"Front track\":\"1,677\",\"Rear track\":\"1,646\",\"Kerb weight**\":\"1436\",\"Dry weight**\":\"1330\",\"Weight distribution\":\"47% front - 53% rear\",\"Fuel tank capacity\":\"78\"},\"Wheels & tyres\":{\"Front\":\"245/35ZR J9.0\",\"Rear\":\"305/30ZR 20 J11.0\"},\"Brakes\":{\"Front\":\"398 x 223 x 38mm\",\"Rear\":\"360 x 233 x 32mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\"340\",\"0-100 km/h\":\"2.9\",\"0-200 km/h\":\"7.8\",\"100-0 km/h\":\"32\",\"Dry weight/power\":\"NA\"},\"Fuel consumption\":{\"Low\":\"21,5\",\"Mid\":\"12,2\",\"High\":\"10,8\",\"Extra High\":\"11,8\",\"Combined\":\"12,9\"},\"C02 emissions\":{\"Low\":\"490\",\"Mid\":\"276\",\"High\":\"246\",\"Extra high\":\"267\",\"Combined\":\"292\"},\"type\":\"Sport Car\"}"
    },
    {
        "title": "F8 Spider",
        "url": "https://www.ferrari.com/en-IN/auto/f8-spider",
        "intro_text": "NA",
        "images": [
            "http://localhost:5000/static/f8-spider.jpg"
        ],
        "Engine": {
            "Type": "V8 - 90°",
            "Overall displacement": "3902",
            "Bore and stroke": "NA",
            "Max power output*": "588 kW (800 cv) at 8,500 rpm",
            "Max torque*": "770 Nm at 3250 rpm",
            "Max engine speed": "8000",
            "Compression ratio": "9.6:1"
        },
        "Dimension and weight": {
            "Length": "4,611",
            "Width": "1,979",
            "Height": "1,206",
            "Wheelbase": "2,650",
            "Front track": "1,677",
            "Rear track": "1,646",
            "Kerb weight**": "NA",
            "Dry weight**": "1,400",
            "Weight distribution": "41.5% front - 58.5% rear",
            "Fuel tank capacity": "78"
        },
        "Wheels & tyres": {
            "Front": "245/35ZR 20 J9.0",
            "Rear": "305/30ZR 20 J11.0"
        },
        "Brakes": {
            "Front": "398 x 223 x 38mm",
            "Rear": "360 x 233 x 32mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": "340",
            "0-100 km/h": "2.9",
            "0-200 km/h": "8.2",
            "100-0 km/h": "NA",
            "Dry weight/power": "NA"
        },
        "Fuel consumption": {
            "Low": "20,9",
            "Mid": "12,4",
            "High": "11,0",
            "Extra High": "12,2",
            "Combined": "13,0"
        },
        "C02 emissions": {
            "Low": "475",
            "Mid": "282",
            "High": "250",
            "Extra high": "277",
            "Combined": "296"
        },
        "type": "Sport Car",
        "raw_data": "{\"title\":\"F8 Spider\",\"url\":\"https://www.ferrari.com/en-IN/auto/f8-spider\",\"intro_text\":\"NA\",\"images\":[\"http://localhost:5000/static/f8-spider\"],\"Engine\":{\"Type\":\"V8 - 90°\",\"Overall displacement\":\"3902\",\"Bore and stroke\":\"NA\",\"Max power output*\":\"588 kW (800 cv) at 8,500 rpm\",\"Max torque*\":\"770 Nm at 3250 rpm\",\"Max engine speed\":\"8000\",\"Compression ratio\":\"9.6:1\"},\"Dimension and weight\":{\"Length\":\"4,611\",\"Width\":\"1,979\",\"Height\":\"1,206\",\"Wheelbase\":\"2,650\",\"Front track\":\"1,677\",\"Rear track\":\"1,646\",\"Kerb weight**\":\"NA\",\"Dry weight**\":\"1,400\",\"Weight distribution\":\"41.5% front - 58.5% rear\",\"Fuel tank capacity\":\"78\"},\"Wheels & tyres\":{\"Front\":\"245/35ZR 20 J9.0\",\"Rear\":\"305/30ZR 20 J11.0\"},\"Brakes\":{\"Front\":\"398 x 223 x 38mm\",\"Rear\":\"360 x 233 x 32mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\"340\",\"0-100 km/h\":\"2.9\",\"0-200 km/h\":\"8.2\",\"100-0 km/h\":\"NA\",\"Dry weight/power\":\"NA\"},\"Fuel consumption\":{\"Low\":\"20,9\",\"Mid\":\"12,4\",\"High\":\"11,0\",\"Extra High\":\"12,2\",\"Combined\":\"13,0\"},\"C02 emissions\":{\"Low\":\"475\",\"Mid\":\"282\",\"High\":\"250\",\"Extra high\":\"277\",\"Combined\":\"296\"},\"type\":\"Sport Car\"}"
    },
    {
        "title": "Ferrari Roma",
        "url": "https://www.ferrari.com/en-IN/auto/ferrari-roma",
        "intro_text": "The Ferrari Roma, the new mid-front-engined 2+ coupé of the Prancing Horse, features refined proportions and timeless design combined with unparalleled performance and handling. With its distinctive flair and style, the car is a contemporary representation of the carefree, pleasurable way of life that characterised Rome in the 1950s and ‘60s.",
        "images": [
            "http://localhost:5000/static/ferrari-roma.jpg"
        ],
        "Engine": {
            "Type": "V8 - 90°",
            "Overall displacement": "3855",
            "Bore and stroke": "86.5 x 82mm",
            "Max power output*": "620 CV@ 5750 - 7500 rpm",
            "Max torque*": "760 Nm at 3000 ÷ 5750rpm",
            "Max engine speed": "7500",
            "Compression ratio": "9,45:1"
        },
        "Dimension and weight": {
            "Length": "4,656",
            "Width": "1,974",
            "Height": "1,301",
            "Wheelbase": "2,670",
            "Front track": "1,652",
            "Rear track": "1,679",
            "Kerb weight**": "1570",
            "Dry weight**": "1,472",
            "Weight distribution": "50% front - 50% rear",
            "Fuel tank capacity": "78"
        },
        "Wheels & tyres": {
            "Front": "245/35 ZR20; 8J x 20”",
            "Rear": "285/35 ZR20; 10J x 20”"
        },
        "Brakes": {
            "Front": "390 mm x 34 mm",
            "Rear": "360 mm x 32 mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": ">320",
            "0-100 km/h": "3.4",
            "0-200 km/h": "9.3",
            "100-0 km/h": "NA",
            "Dry weight/power": "2.37kg/cv"
        },
        "Fuel consumption": {
            "Low": "17,8",
            "Mid": "10,8",
            "High": "9,7",
            "Extra High": "10,3",
            "Combined": "11,2"
        },
        "C02 emissions": {
            "Low": "404",
            "Mid": "246",
            "High": "220",
            "Extra high": "235",
            "Combined": "255"
        },
        "type": "Sport Car",
        "raw_data": "{\"title\":\"Ferrari Roma\",\"url\":\"https://www.ferrari.com/en-IN/auto/ferrari-roma\",\"intro_text\":\"The Ferrari Roma, the new mid-front-engined 2+ coupé of the Prancing Horse, features refined proportions and timeless design combined with unparalleled performance and handling. With its distinctive flair and style, the car is a contemporary representation of the carefree, pleasurable way of life that characterised Rome in the 1950s and ‘60s.\",\"images\":[\"http://localhost:5000/static/ferrari-roma.jpg\"],\"Engine\":{\"Type\":\"V8 - 90°\",\"Overall displacement\":\"3855\",\"Bore and stroke\":\"86.5 x 82mm\",\"Max power output*\":\"620 CV@ 5750 - 7500 rpm\",\"Max torque*\":\"760 Nm at 3000 ÷ 5750rpm\",\"Max engine speed\":\"7500\",\"Compression ratio\":\"9,45:1\"},\"Dimension and weight\":{\"Length\":\"4,656\",\"Width\":\"1,974\",\"Height\":\"1,301\",\"Wheelbase\":\"2,670\",\"Front track\":\"1,652\",\"Rear track\":\"1,679\",\"Kerb weight**\":\"1570\",\"Dry weight**\":\"1,472\",\"Weight distribution\":\"50% front - 50% rear\",\"Fuel tank capacity\":\"78\"},\"Wheels & tyres\":{\"Front\":\"245/35 ZR20; 8J x 20”\",\"Rear\":\"285/35 ZR20; 10J x 20”\"},\"Brakes\":{\"Front\":\"390 mm x 34 mm\",\"Rear\":\"360 mm x 32 mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\">320\",\"0-100 km/h\":\"3.4\",\"0-200 km/h\":\"9.3\",\"100-0 km/h\":\"NA\",\"Dry weight/power\":\"2.37kg/cv\"},\"Fuel consumption\":{\"Low\":\"17,8\",\"Mid\":\"10,8\",\"High\":\"9,7\",\"Extra High\":\"10,3\",\"Combined\":\"11,2\"},\"C02 emissions\":{\"Low\":\"404\",\"Mid\":\"246\",\"High\":\"220\",\"Extra high\":\"235\",\"Combined\":\"255\"},\"type\":\"Sport Car\"}"
    },
    {
        "title": "Ferrari Portofino M",
        "url": "https://www.ferrari.com/en-IN/auto/ferrari-portofino-m",
        "intro_text": "The Ferrari Portofino M, which features the legendary ‘M’ suffix, for Modificata, in its name, is the evolution of the Ferrari Portofino. The new Prancing Horse 2+ spider boasts a slew of new technical and design features, most notably an 8-speed dual-clutch gearbox and a five-position Manettino, an absolute first for a Ferrari GT convertible. Every drive aboard the Ferrari Portofino M is a voyage of (re)discovery.",
        "images": [
            "http://localhost:5000/static/2021-Ferrari-Portofino-M.jpg",
            "http://localhost:5000/static/2021-Ferrari-Portofino-M-2.jpg"
        ],
        "Engine": {
            "Type": "V8 - 90° turbo",
            "Overall displacement": "3855",
            "Bore and stroke": "86.5 x 82mm",
            "Max power output*": "620 CV@ 7500 rpm",
            "Max torque*": "760 Nm at 5750rpm",
            "Max engine speed": "7500",
            "Compression ratio": "9,45:1"
        },
        "Dimension and weight": {
            "Length": "4,594",
            "Width": "1,938",
            "Height": "1,318",
            "Wheelbase": "2,670",
            "Front track": "1,633",
            "Rear track": "1,635",
            "Kerb weight**": "1664",
            "Dry weight**": "1545",
            "Weight distribution": "NA",
            "Fuel tank capacity": "80"
        },
        "Wheels & tyres": {
            "Front": "245/35 ZR20; 8J x 20”",
            "Rear": "285/35 ZR20; 10J x 20”"
        },
        "Brakes": {
            "Front": "390 mm x 34 mm",
            "Rear": "360 mm x 32 mm"
        },
        "Transmission/gearbox": {},
        "Electronic controls": {},
        "Performance": {
            "Max speed": ">320",
            "0-100 km/h": "3.45",
            "0-200 km/h": "9.8",
            "100-0 km/h": "NA",
            "Dry weight/power": "2.49kg/cv"
        },
        "Fuel consumption": {
            "Low": "18",
            "Mid": "11",
            "High": "9.9",
            "Extra High": "10.1",
            "Combined": "11.3"
        },
        "C02 emissions": {
            "Low": "409",
            "Mid": "250",
            "High": "224",
            "Extra high": "229",
            "Combined": "256"
        },
        "type": "Vintage Car",
        "raw_data": "{\"title\":\"Ferrari Portofino M\",\"url\":\"https://www.ferrari.com/en-IN/auto/ferrari-portofino-m\",\"intro_text\":\"The Ferrari Portofino M, which features the legendary ‘M’ suffix, for Modificata, in its name, is the evolution of the Ferrari Portofino. The new Prancing Horse 2+ spider boasts a slew of new technical and design features, most notably an 8-speed dual-clutch gearbox and a five-position Manettino, an absolute first for a Ferrari GT convertible. Every drive aboard the Ferrari Portofino M is a voyage of (re)discovery.\",\"images\":[\"http://localhost:5000/static/2021-Ferrari-Portofino-M.jpg\",\"http://localhost:5000/static/2021-Ferrari-Portofino-M-2.jpg\"],\"Engine\":{\"Type\":\"V8 - 90° turbo\",\"Overall displacement\":\"3855\",\"Bore and stroke\":\"86.5 x 82mm\",\"Max power output*\":\"620 CV@ 7500 rpm\",\"Max torque*\":\"760 Nm at 5750rpm\",\"Max engine speed\":\"7500\",\"Compression ratio\":\"9,45:1\"},\"Dimension and weight\":{\"Length\":\"4,594\",\"Width\":\"1,938\",\"Height\":\"1,318\",\"Wheelbase\":\"2,670\",\"Front track\":\"1,633\",\"Rear track\":\"1,635\",\"Kerb weight**\":\"1664\",\"Dry weight**\":\"1545\",\"Weight distribution\":\"NA\",\"Fuel tank capacity\":\"80\"},\"Wheels & tyres\":{\"Front\":\"245/35 ZR20; 8J x 20”\",\"Rear\":\"285/35 ZR20; 10J x 20”\"},\"Brakes\":{\"Front\":\"390 mm x 34 mm\",\"Rear\":\"360 mm x 32 mm\"},\"Transmission/gearbox\":{},\"Electronic controls\":{},\"Performance\":{\"Max speed\":\">320\",\"0-100 km/h\":\"3.45\",\"0-200 km/h\":\"9.8\",\"100-0 km/h\":\"NA\",\"Dry weight/power\":\"2.49kg/cv\"},\"Fuel consumption\":{\"Low\":\"18\",\"Mid\":\"11\",\"High\":\"9.9\",\"Extra High\":\"10.1\",\"Combined\":\"11.3\"},\"C02 emissions\":{\"Low\":\"409\",\"Mid\":\"250\",\"High\":\"224\",\"Extra high\":\"229\",\"Combined\":\"256\"},\"type\":\"Vintage Car\"}"
    }
]
  
# In the above list _id field is provided so it inserted in 
# the collection as specified.
  
# Inseting the entire list in the collection
collection.insert_many(mylist)