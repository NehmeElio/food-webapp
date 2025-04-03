import pandas as pd
import json
from pathlib import Path



# Function to load the data
def load_data(json_path):
    with open(json_path, "r", encoding="utf-8") as f:
        recipes = json.load(f)
    # Now you have a list of dicts
    print(f"Loaded {len(recipes)} recipes")
    print(recipes[0]["title"])
    return recipes


# Function to map cuisine to reduced regions
def map_to_region(cuisine_list):
    cuisine_region_map = {
    # Middle Eastern
    'Lebanese': 'Middle Eastern', 'Persian': 'Middle Eastern', 'Iranian': 'Middle Eastern',
    'Israeli': 'Middle Eastern', 'Palestinian': 'Middle Eastern', 'Levantine': 'Middle Eastern',
    'Yemeni': 'Middle Eastern',
 
    # African
    'Moroccan': 'African', 'Egyptian': 'African', 'Nigerian': 'African', 'Ethiopian': 'African',
    'South African': 'African', 'West African': 'African', 'East African': 'African', 'North African': 'African',
    'Tunisian': 'African', 'Somali': 'African',
 
    # Asian
    'Chinese': 'Asian', 'Japanese': 'Asian', 'Korean': 'Asian',
    'Chinese-American': 'Asian', 'Taiwanese': 'Asian', 'Cantonese': 'Asian',
    'Sichuanese': 'Asian', 'Armenian': 'Asian',  'Tibetan': 'Asian', 'Shanghainese': 'Asian',
    'Indian': 'Asian', 'Pakistani': 'Asian', 'Bangladeshi': 'Asian', 'Sri Lankan': 'Asian',
    'Vietnamese': 'Asian', 'Thai': 'Asian', 'Filipino': 'Asian',
    'Indonesian': 'Asian', 'Malaysian': 'Asian', 'Burmese': 'Asian','East Asian':'Asian','Southeast Asian':'Asian','South Asian':'Asian',
 
    # Latin America
    'Mexican': 'Mexican', 'Brazilian': 'Latin American', 'Argentinean': 'Latin American',
    'Colombian': 'Latin American', 'Peruvian': 'Latin American', 'Caribbean': 'Latin American',
    'Cuban': 'Latin American', 'Puerto Rican': 'Latin American', 'Central American': 'Latin American',
    'South American': 'Latin American', 'Trinidadian': 'Latin American', 'Dominican': 'Latin American',
    'Jamaican': 'Latin American', 'Oaxacan': 'Latin American', 'Venezuelan': 'Latin American',
    'Salvadoran': 'Latin American',
 
    # Europe
    'Italian': 'Italian', 'Italian American': 'Italian', 'French': 'French', 'Greek': 'European',
    'German': 'European', 'Spanish': 'European', 'British': 'European', 'Eastern European': 'European',
    'Portuguese': 'European', 'Irish': 'European', 'Russian': 'European', 'Scandinavian': 'European',
    'Austrian': 'European', 'Hungarian': 'European', 'Belgian': 'European', 'Swiss': 'European',
    'Turkish': 'European', 'Sicilian': 'European', 'English': 'European', 'Swedish': 'European',
    'Scottish': 'European', 'Polish': 'European', 'Laotian': 'European', 'Romanian': 'European',
    'Danish': 'European', 'Basque': 'European', 'Georgian': 'European', 'Ukrainian': 'European',
    'Norwegian': 'European',
 
    # North America
    'American': 'North American', 'Southern': 'North American', 'Cajun & Creole': 'North American',
    'Tex-Mex': 'North American', 'California Cuisine': 'North American', 'Soul Food': 'North American',
    'New England': 'North American', 'Canadian': 'North American', 'Southwestern': 'North American',
    'Hawaiian': 'North American', 'Low Country Cuisine': 'North American',
 
    # Other
    'Jewish': 'Middle Eastern', 'Mediterranean': 'Middle Eastern', 'Australian': 'Australian',
    'Native American': 'Latin American', 'Haitian': 'Latin American', 'New Zealand': 'Australian'
    }

    
    # if not isinstance(cuisine_list, list):
    #     return []
    
    return list({cuisine_region_map.get(c, c) for c in cuisine_list if c != 'Australian' and c!='New Zealand'})

# Function to preprocess the dataset
def preprocess(df):
    print(df.columns)

    df_tags_expanded = pd.json_normalize(df["tags"].fillna({}))
    df = df.drop(columns=["tags"]).join(df_tags_expanded)
    
    df["cuisine"] = df["cuisine"].apply(lambda x: x if isinstance(x, list) else [])
    df["cuisine_grouped"] = df["cuisine"].apply(map_to_region)

    return df



if __name__ == "__main__":
        
    json_path = Path("data/recipes_images.json")
    recipes = load_data(json_path)
    
    df = pd.DataFrame(recipes)
    
    df= preprocess(df)

    df.to_json("data/recipes_images.json", orient="records", lines=True)  # Save as JSON file
    print(f"Processed data saved to recipes_images.json")

