import os
import pandas as pd
import math
from django.core.management.base import BaseCommand
from backendapp.models import LoadPosting

class Command(BaseCommand):
    help = "Import data into LoadPosting from either XLSX or CSV."

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help="Path to the load_posting file (xlsx or csv)")

    def handle(self, *args, **options):
        file_path = options['file_path']
        self.stdout.write(self.style.WARNING(f"Reading file: {file_path}"))

        # Decide how to read the file based on extension
        _, ext = os.path.splitext(file_path)
        # can remove this statement - not using xlsx anymore
        if ext.lower() in ['.xlsx', '.xls']:
            df = pd.read_excel(file_path)
        elif ext.lower() == '.csv':
            df = pd.read_csv(file_path)
        else:
            self.stdout.write(self.style.ERROR("Unsupported file format!"))
            return

        # For each row, create or update a LoadPosting object
        for _, row in df.iterrows():
            load_id = str(row.get('LOAD_ID', ''))
            if not load_id:
                continue  # skip rows without a LOAD_ID
            
            def parse_float(val):
                if pd.isnull(val):
                    return None
                float_val = float(val)
                
                if math.isinf(float_val) or math.isnan(float_val):
                    return None
                return float_val

            # convert booleans (like HAS_APPOINTMENTS) from "TRUE"/"FALSE" or 0/1
            def parse_bool(val):
                if isinstance(val, bool):
                    return val
                if str(val).lower() in ['true', '1']:
                    return True
                return False

            # parse datetime columns if needed
            def parse_date(val):
                if pd.isnull(val):
                    return None
                return pd.to_datetime(val, errors='coerce')

            obj, created = LoadPosting.objects.update_or_create(
                load_id=load_id,
                defaults={
                    'posting_status': row.get('POSTING_STATUS'),
                    'source_system': row.get('SOURCE_SYSTEM'),
                    'has_appointments': parse_bool(row.get('HAS_APPOINTMENTS')),
                    'is_hazardous': parse_bool(row.get('IS_HAZARDOUS')),
                    'is_high_value': parse_bool(row.get('IS_HIGH_VALUE')),
                    'is_temperature_controlled': parse_bool(row.get('IS_TEMPERATURE_CONTROLLED')),
                    'total_distance': parse_float(row.get('TOTAL_DISTANCE')),
                    'distance_uom': row.get('DISTANCE_UOM'),
                    'total_weight': parse_float(row.get('TOTAL_WEIGHT')),
                    'weight_uom': row.get('WEIGHT_UOM'),
                    'number_of_stops': row.get('NUMBER_OF_STOPS'),
                    'transport_mode': row.get('TRANSPORT_MODE'),
                    'created_date': parse_date(row.get('CREATED_DATE')),
                    'updated_date': parse_date(row.get('UPDATED_DATE')),
                    'managed_equipment': parse_bool('MANAGED_EQUIPMENT'),
                    'load_number_alias': row.get('LOAD_NUMBER_ALIAS'),
                    'is_carb': parse_bool(row.get('IS_CARB')),
                    'fpc': parse_bool(row.get('FPC')),
                    'fpo': parse_bool(row.get('FPO')),
                    'division': row.get('DIVISION'),
                    'capacity_type': row.get('CAPACITY_TYPE'),
                    'extended_network': parse_bool(row.get('EXTENDED_NETWORK')),
                }
            )

        self.stdout.write(self.style.SUCCESS("LoadPosting data imported successfully!"))
