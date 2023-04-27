import re
import json
import pymongo
from pprint import pprint
import os
#print(os.environ["DB_URI"])

myprod = pymongo.MongoClient(os.environ["DB_URI"])

CAR_PROJECTION = {
    "title":1,
    "synonyms": 1,
    "key": 1
}

def getCarKeys(BRAND):
    all_car_keys = []
    all_titles = []
    for k in myprod['Driven_pre_prod']['cars'].find({'brand_name' : BRAND}, CAR_PROJECTION):
        if k['title'] not in all_titles:
            all_car_keys.append(tuple([k['title'],k['key']]))
            all_titles.append(k['title'])
        if len(k.get('synonyms', [])) > 0:
            for ele in k.get('synonyms'):
                if len(ele)>7:
                    if ele not in all_titles:
                        all_car_keys.append(tuple([ele,k['key']]))
                        all_titles.append(ele)
        
    # all_car_keys.sort(key=len,reverse=True)
    all_car_keys.sort(key=lambda x: len(x[0]), reverse=True)
    return all_car_keys


def keyTag(title_obj,all_car_keys):
    title_array = []
    key_array = []
    final_key = ""
    for car_key in all_car_keys:
        title = title_obj[0]
        year_str = re.match('(19|20)\d{2}',title)
        if year_str:
            title = title_obj[0].replace(year_str.group(0),'').strip()        
        #Logic 4 
        title = title.replace('-',' ').replace('/',' ').replace('\\',' ').replace(')',' ').replace('(',' ').replace('Rwd',' ').replace('Production',' ').replace('Figures','').replace('Hatchback',' ').replace('Sedan',' ').replace('SUV',' ').replace("SWB",' ').replace("2+2",' ').strip()
        new_title = re.split('\d+|\s', title.lower())+list(re.findall("\d+",title.lower()))
        new_title = [i for i in new_title if i]
        # print(new_title)
        car_key2 = car_key[0].replace('-',' ').replace('/',' ').replace('\\',' ').replace(')',' ').replace('(',' ').replace('Rwd',' ').replace('Production',' ').replace('Figures','').replace('Hatchback',' ').replace('Sedan',' ').replace('SUV',' ').replace("SWB",' ').replace("2+2",' ').strip().lower()
        car_key3 = re.split('\d+|\s', car_key2)+list(re.findall("\d+",car_key2))
        # print(car_key3)
        car_key3 = [i for i in car_key3 if i not in ["coupe", ""]]
        # print(car_key3)
        # print(new_title)
        diff_set_str = set(new_title).intersection(set(car_key3))
        # print(diff_set_str)
        if diff_set_str == set(car_key3):
            final_key = car_key[1]
            key_array.append(tuple([diff_set_str, final_key]))
            title_array.append(car_key[0])
            # break
    
    if len(title_array)>0:
        # this logic is in place to handle situations like ferrari 328 coupe and ferrari 328 gts for ferrari 328 gts model
        key_array.sort(key = lambda x: len(x[0]), reverse=True)
        """ print(key_array)
        print(title_array) """
        final_key = key_array[0][1]
    else:
        final_key = ""

    return final_key


def get_key(title, BRAND):

    all_car_keys = getCarKeys(BRAND)
    # all_car_keys = [ele for ele in all_car_keys if "308" in ele[0]]
    # pprint(all_car_keys)
    # for ele in all_car_keys:
    #     if ele[0] == "Ferrari 308 GTB Coupe":
    #         # print(ele)
    #         all_car_keys = [ele]
    key = keyTag(tuple([title,"",""]), all_car_keys)
    return key


if __name__ == '__main__':
    #print(get_key("1950 FERRARI 166 Vignale Spyder", "Ferrari"))
    import sys
    args = sys.argv
    if len(args) > 2 :
        try:
            import json
            print(json.dumps(get_key(args[1],args[2])))
        except exceptions.ValidationError as e:
            print(json.dumps({"is_error": True, "error": str(e), "type": "ValidationError"}))
        except Exception as e:
            print(json.dumps({"is_error": True, "error": str(e), "type": "Exception"}))
    else :
        print(json.dumps({"is_error": True, "error": 'Please provide vin no', "type": "ValidationError"}))