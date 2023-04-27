from vininfo import Vin, exceptions

def get_vin_info(vin_no: str) -> dict:
    vin_info = Vin(vin_no)
    return {
      # "annotate": vin_info.annotate_titles,
      "country": vin_info.country,
      "manufacturer": vin_info.manufacturer,
      "manufacturer_is_small": vin_info.manufacturer_is_small,
      "num": vin_info.num,
      "region": vin_info.region,
      "region_code": vin_info.region_code,
      # "validate": vin_info.validate,
      "vds": vin_info.vds,
      # "verify_checksum": vin_info.verify_checksum,
      "years": vin_info.years,
      "vis": vin_info.vis,
      "wmi": vin_info.wmi,
      # "brand": vin_info.brand,
      "country": vin_info.country,
      "country_code": vin_info.country_code,
      "details": vin_info.details,
    }
    
if __name__ == "__main__":
  import sys
  args = sys.argv
  if len(args) > 1 :
    try:
      import json
      print(json.dumps(get_vin_info(args[1])))
    except exceptions.ValidationError as e:
      print(json.dumps({"is_error": True, "error": str(e), "type": "ValidationError"}))
    except Exception as e:
      print(json.dumps({"is_error": True, "error": str(e), "type": "Exception"}))
  else :
      print(json.dumps({"is_error": True, "error": 'Please provide vin no', "type": "ValidationError"}))
    