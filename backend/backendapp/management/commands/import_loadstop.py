import os
import pandas as pd
from django.core.management.base import BaseCommand
from backendapp.models import LoadPosting, LoadStop

class Command(BaseCommand):
    help = "Import data into LoadStop from either XLSX or CSV."

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help="Path to the load_stop file (xlsx or csv)")

    def handle(self, *args, **options):
        file_path = options['file_path']
        self.stdout.write(self.style.WARNING(f"Reading file: {file_path}"))

        _, ext = os.path.splitext(file_path)
        if ext.lower() in ['.xlsx', '.xls']:
            df = pd.read_excel(file_path)
        elif ext.lower() == '.csv':
            df = pd.read_csv(file_path)
        else:
            self.stdout.write(self.style.ERROR("Unsupported file format!"))
            return

        def parse_date(val):
            if pd.isnull(val):
                return None
            return pd.to_datetime(val, errors='coerce')

        for _, row in df.iterrows():
            load_id = str(row.get('LOAD_ID', ''))
            if not load_id:
                continue

            try:
                load_posting = LoadPosting.objects.get(load_id=load_id)
            except LoadPosting.DoesNotExist:
                # If there's no matching LoadPosting, skip or create one automatically
                self.stdout.write(self.style.WARNING(f"No LoadPosting found for LOAD_ID={load_id}, skipping"))
                continue

            # create or update a LoadStop
            stop_id = str(row.get('STOP_ID', ''))

            LoadStop.objects.create(
                load_posting=load_posting,
                stop_id=stop_id,
                stop_sequence=row.get('STOP_SEQUENCE'),
                stop_type=row.get('STOP_TYPE'),
                activity_type=row.get('ACTIVITY_TYPE'),
                appointment_from=parse_date(row.get('APPOINTMENT_FROM')),
                appointment_to=parse_date(row.get('APPOINTMENT_TO')),
                city=row.get('CITY'),
                state=row.get('STATE'),
                postal_code=row.get('POSTAL_CODE'),
                time_zone=row.get('TIME_ZONE'),
                country=row.get('COUNTRY'),
                location_name=row.get('LOCATION_NAME'),
                address_line_1=row.get('ADDRESS_LINE_1'),
                address_line_2=row.get('ADDRESS_LINE_2'),
                appointment_state=row.get('APPOINTMENT_STATE'),
                created_date=parse_date(row.get('CREATED_DATE')),
                updated_date=parse_date(row.get('UPDATED_DATE')),
            )

        self.stdout.write(self.style.SUCCESS("LoadStop data imported successfully!"))
