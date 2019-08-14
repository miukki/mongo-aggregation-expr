/**
 * from - The target collection.
 * startWith - Expression to start.
 * connectFromField - Field to connect.
 * connectToField - Field to connect to.
 * as - Name of the array field.
 * maxDepth - Optional max recursion depth.
 * depthField - Optional Name of the depth field.
 * restrictSearchWithMatch - Optional query.
 */
db.getCollection("accounts").aggregate(
    [
        { 
            "$match" : {

            }
        }, 
        { 
            "$addFields" : {
                "_idstr" : {
                    "$toString" : "$_id"
                }
            }
        }, 
        { 
            "$graphLookup" : {
                "from" : "transactions", 
                "startWith" : "$_idstr", 
                "connectFromField" : "amount", 
                "connectToField" : "fromAccount", 
                "as" : "amountsFrom", 
                "depthField" : "depthField"
            }
        }, 
        { 
            "$graphLookup" : {
                "from" : "transactions", 
                "startWith" : "$_idstr", 
                "connectFromField" : "amount", 
                "connectToField" : "toAccount", 
                "as" : "amountsTo", 
                "depthField" : "depthField"
            }
        }, 
     
        { 
            "$match" : {

            }
        }
    ], 
    { 
        "allowDiskUse" : false,
    }
).pretty();
