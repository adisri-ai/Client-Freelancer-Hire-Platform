from typing import List
from utils.database import client_bookMarks_collection, freelancer_portfolio_collection, review_collection
from utils.validator import validate_user_exists

async def add_bookmark(client_id: str, freelancer_ids: List[str]) -> dict:
    """Adds a list of freelancers to a client's bookmark list."""
    await validate_user_exists(client_id)
    await client_bookMarks_collection.update_one(
        {"client_id": client_id},
        {"$addToSet": {"freelancers": {"$each": freelancer_ids}}},
        upsert=True
    )
    return {"message": f"{len(freelancer_ids)} freelancer(s) bookmarked successfully."}

async def remove_bookmark(client_id: str, freelancer_ids: List[str]) -> dict:
    """Removes a list of freelancers from a client's bookmark list."""
    await validate_user_exists(client_id)
    await validate_user_exists(freelancer_ids)
    await client_bookMarks_collection.update_one(
        {"client_id": client_id},
        {"$pullAll": {"freelancers": freelancer_ids}}
    )
    return {"message": f"{len(freelancer_ids)} freelancer(s) removed from bookmarks."}

async def get_bookmarked_freelancers(client_id: str) -> list:
    """Fetches the actual portfolio data for all bookmarked freelancers."""
    await validate_user_exists(client_id)
    bookmark_doc = await client_bookMarks_collection.find_one({"client_id": client_id})
    if not bookmark_doc or not bookmark_doc.get("freelancers"):
        return [] 
        
    freelancer_ids = bookmark_doc["freelancers"]

    cursor = freelancer_portfolio_collection.find({"user_id": {"$in": freelancer_ids}})
    found_portfolios = await cursor.to_list(length=100)
    portfolio_map = {port["user_id"]: port for port in found_portfolios}
    
    final_results = []

    for f_id in freelancer_ids:
        port = portfolio_map.get(f_id)
        
        if port:
            port.pop("_id", None)
            
            rev_cursor = review_collection.find({"freelancer_id": f_id})
            reviews = await rev_cursor.to_list(length=100)
            
            if reviews:
                total_stars = sum(r["stars"] for r in reviews)
                port["rating"] = round(total_stars / len(reviews), 1)
            else:
                port["rating"] = 4.0
                
            port["portfolio_exists"] = True
            final_results.append(port)
            
        else:
            final_results.append({
                "user_id": f_id,
                "portfolio_exists": False,
                "message": "Portfolio not found or has been deleted."
            })
            
    return final_results
