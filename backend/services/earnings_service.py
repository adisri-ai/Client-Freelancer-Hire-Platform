from utils.database import (
    transaction_collection, 
    user_collection
)
from datetime import datetime, timezone
import uuid
from utils.validator import validate_user_exists




async def upgrade_to_pro(user_id: str) -> dict:
    """Sandbox checkout: Freelancer buys the Pro tier."""
    
    user = await user_collection.find_one({"user_id": user_id})
    if not user:
        raise ValueError("User not found.")
        
    if user.get("is_pro"):
        raise ValueError("You are already a Pro Freelancer.")

    
    await user_collection.update_one(
        {"user_id": user_id},
        {"$set": {"is_pro": True}}
    )

    
    sub_transaction = {
        "transaction_id": f"sub_{uuid.uuid4().hex[:8]}",
        "freelancer_id": user_id,
        "type": "Subscription",
        "amount": -15.00, 
        "status": "Completed",
        "created_at": datetime.now(timezone.utc)
    }
    await transaction_collection.insert_one(sub_transaction)

    return {"message": "Successfully upgraded to Pro Freelancer!"}


async def get_freelancer_earnings_dashboard(freelancer_id: str) -> dict:
    """Calculates metrics, platform fees, and builds table data for the React UI."""
    await validate_user_exists(freelancer_id)
    cursor = transaction_collection.find({"freelancer_id": freelancer_id})
    transactions = await cursor.to_list(length=500)
    
    total_earned = 0.0
    total_commission_paid = 0.0
    pending_payments_list = []
    withdrawals_list = []
    
    for tx in transactions:
        
        if tx["type"] == "Earning" and tx["status"] == "Completed":
            total_earned += tx["amount"]
            
            total_commission_paid += tx.get("platform_fee", 0.0)
            
        
        elif tx["type"] == "Earning" and tx["status"] == "Pending":
            pending_payments_list.append({
                "project_id": tx.get("project_id", "N/A"),
                "client_id": tx.get("client_id", "N/A"),
                "pending_amount": tx["amount"]
            })
                
        
        elif tx["type"] == "Withdrawal" and tx["status"] == "Completed":
            withdrawals_list.append({
                "date": tx["created_at"].strftime("%Y-%m-%d"),
                "amount": tx["amount"]
            })
            
    
    withdrawals_list.sort(key=lambda x: x["date"], reverse=True)
    
    return {
        "total_earned": round(total_earned, 2),
        "total_commission_paid": round(total_commission_paid, 2), 
        "pending_payments": pending_payments_list,
        "withdrawals": withdrawals_list
    }
