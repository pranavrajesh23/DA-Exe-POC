# Sample/placeholder data reconstructed from the "Fleet Health - Verizon
# Connect NRUs_Battery Assets" static export while the real Databricks table
# for this report is not yet available. Swap these two functions for real
# `get_connection(user_token)` queries (see sales_repository.py) once that
# table is identified -- the service and route layers above this don't change.

_HIERARCHY_LABELS = [
    "East Operations", "Integrated Solutions", "New York Metro Operations",
    "Other Operations", "Platform OpUs", "Supply Chain Solutions",
    "UU&I Operations", "West Operations",
]
_HIERARCHY_SERIES = {
    "ET Asset Trailer": [120, 2, 1, 0, 0, 6, 55, 90],
    "ET Asset Trailer - CATM1": [5, 0, 0, 0, 0, 0, 2, 3],
    "ET Asset Trailer - LTE": [3, 0, 0, 0, 0, 0, 1, 2],
    "LM Asset Trailer": [510, 15, 0, 14, 2, 0, 285, 335],
    "ThingSpace - CATM1": [8, 1, 0, 1, 0, 0, 6, 4],
}

_WEEK_STARTS = [
    "2025-11-01", "2025-11-08", "2025-11-15", "2025-11-22", "2025-11-29",
    "2025-12-06", "2025-12-13", "2025-12-20", "2025-12-27", "2026-01-03",
    "2026-01-10", "2026-01-17", "2026-01-24", "2026-01-31", "2026-02-07",
    "2026-02-14", "2026-02-21", "2026-02-28", "2026-03-07", "2026-03-14",
    "2026-03-21", "2026-03-28", "2026-04-04", "2026-04-11", "2026-04-18",
    "2026-04-25", "2026-05-02", "2026-05-09", "2026-05-16", "2026-05-23",
    "2026-05-30", "2026-06-06", "2026-06-13", "2026-06-20", "2026-06-27",
    "2026-07-04", "2026-07-11", "2026-07-18", "2026-07-25", "2026-08-01",
    "2026-08-08", "2026-08-15", "2026-08-22", "2026-08-29", "2026-09-05",
]
_WEEKLY_TOTALS = [
    1353, 1372, 1390, 1471, 1521, 1599, 1611, 1641, 1600, 1626,
    1662, 1607, 1577, 1550, 1537, 1524, 1524, 1497, 1486, 1473,
    1476, 1464, 1445, 1481, 1513, 1537, 1520, 1505, 1495, 1490,
    1500, 1510, 1518, 1508, 1498, 1488, 1478, 1470, 1465, 1460,
    1470, 1480, 1490, 1500, 1510,
]
# Rough visual proportions read off the reference chart: LM Asset Trailer is
# the majority (grey), ET Asset Trailer the second band (dark red), everything
# else a thin sliver on top.
_WEEKLY_SERIES_SHARE = {
    "LM Asset Trailer": 0.62,
    "ET Asset Trailer": 0.35,
    "ThingSpace - CATM1": 0.02,
    "ET Asset Trailer - LTE": 0.005,
    "ET Asset Trailer - CATM1": 0.005,
}

_MAKEUP_LABELS = ["ET Asset Trailer", "ET Asset Trailer - LTE", "ET Asset Trailer - CATM1", "LM Asset Trailer", "ThingSpace - CATM1 - 2 Hr"]
_MAKEUP_VALUES = [330, 15, 10, 1120, 22]

_CATEGORY_LABELS = ["Incomplete Install or Activation", "Lost Power", "Low Battery Detected", "Requires Investigation", "Weak Cellular Signal"]
_CATEGORY_VALUES = [22, 395, 12, 274, 768]

_DAYS_LABELS = ["0-7 Days", "8-14 Days", "15-30 Days", "31-60 Days", "61-90 Days", "90+ Days"]
_DAYS_VALUES = [96, 91, 65, 143, 493, 583]

_DETAIL_COLUMNS = [
    "Region", "Group", "Company", "Assigned To", "Vehicle Name", "Unit Id", "ESN",
    "Last Report Time Unit Tz", "Device Category", "Not Reporting For Days",
    "NRU Timeframe Bucket", "Category", "Install Type Name", "Country Code",
    "State", "City", "Street", "Postcode", "Zip", "Lat", "Lon",
]
_DETAIL_ROWS = [
    ["East Operations", "UU&I Operations", "Verizon Connect", "J. Alvarez", "Trailer 4021", "40021", "355012345678901",
     "2026-09-20 14:32", "LM Asset Trailer", 92, "61-90 Days", "Weak Cellular Signal", "Standard Install", "US",
     "GA", "Atlanta", "1200 Peachtree St", "30309", "30309", 33.789, -84.384],
    ["West Operations", "West Operations", "Verizon Connect", "M. Chen", "Trailer 1187", "11187", "355012345678902",
     "2026-09-18 09:05", "LM Asset Trailer", 105, "90+ Days", "Lost Power", "Standard Install", "US",
     "CA", "Fresno", "88 Blackstone Ave", "93701", "93701", 36.741, -119.772],
    ["East Operations", "UU&I Operations", "Verizon Connect", "R. Patel", "Trailer 3390", "33390", "355012345678903",
     "2026-09-21 22:18", "ET Asset Trailer", 12, "8-14 Days", "Requires Investigation", "Standard Install", "US",
     "NC", "Charlotte", "500 S Tryon St", "28202", "28202", 35.227, -80.843],
    ["West Operations", "West Operations", "Verizon Connect", "S. Okafor", "Trailer 2214", "22214", "355012345678904",
     "2026-09-15 03:47", "LM Asset Trailer", 71, "61-90 Days", "Weak Cellular Signal", "Standard Install", "US",
     "AZ", "Phoenix", "24 N Central Ave", "85004", "85004", 33.448, -112.074],
    ["UU&I Operations", "UU&I Operations", "Verizon Connect", "T. Nguyen", "Trailer 5502", "55502", "355012345678905",
     "2026-09-22 11:52", "LM Asset Trailer", 4, "0-7 Days", "Incomplete Install or Activation", "New Install", "US",
     "TX", "Houston", "910 Louisiana St", "77002", "77002", 29.760, -95.369],
    ["East Operations", "Integrated Solutions", "Verizon Connect", "D. Brooks", "Trailer 0098", "00098", "355012345678906",
     "2026-09-10 17:29", "ThingSpace - CATM1", 132, "90+ Days", "Weak Cellular Signal", "Standard Install", "US",
     "VA", "Richmond", "600 E Main St", "23219", "23219", 37.541, -77.436],
    ["West Operations", "Other Operations", "Verizon Connect", "L. Garcia", "Trailer 6671", "66671", "355012345678907",
     "2026-09-19 06:14", "LM Asset Trailer", 28, "15-30 Days", "Low Battery Detected", "Standard Install", "US",
     "NV", "Reno", "50 W Liberty St", "89501", "89501", 39.529, -119.813],
    ["UU&I Operations", "Supply Chain Solutions", "Verizon Connect", "K. Wallace", "Trailer 7788", "77788", "355012345678908",
     "2026-09-05 20:41", "ET Asset Trailer", 380, "90+ Days", "Lost Power", "Standard Install", "US",
     "OH", "Columbus", "175 S 3rd St", "43215", "43215", 39.961, -82.999],
]


def fetch_battery_assets_summary(user_token: str):
    """Returns the pre-aggregated shapes each chart on the Battery Assets tab needs."""
    return {
        "kpis": {
            "totalBatteryAssets": 9847,
            "currentNrus": 1497,
            "nruPercent": 15.2,
        },
        "hierarchy": {
            "labels": _HIERARCHY_LABELS,
            "series": [{"label": name, "values": values} for name, values in _HIERARCHY_SERIES.items()],
        },
        "weekly": {
            "weekStarts": _WEEK_STARTS,
            "series": [
                {"label": name, "values": [round(total * share) for total in _WEEKLY_TOTALS]}
                for name, share in _WEEKLY_SERIES_SHARE.items()
            ],
        },
        "makeup": {"labels": _MAKEUP_LABELS, "values": _MAKEUP_VALUES},
        "category": {"labels": _CATEGORY_LABELS, "values": _CATEGORY_VALUES},
        "daysNotReporting": {"labels": _DAYS_LABELS, "values": _DAYS_VALUES},
    }


def fetch_battery_assets_detail(user_token: str, limit: int = 500):
    return _DETAIL_COLUMNS, _DETAIL_ROWS[:limit]
