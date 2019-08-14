//for collection accounts

db.getCollection("accounts").aggregate(
    [
        {
          '$addFields': {
            '_idstr': {
              '$toString': '$_id'
            }
          }
        }, {
          '$graphLookup': {
            'from': 'transactions', 
            'startWith': '$_idstr', 
            'connectFromField': 'amount', 
            'connectToField': 'fromAccount', 
            'as': 'amountsFrom', 
            'depthField': 'depthField'
          }
        }, {
          '$graphLookup': {
            'from': 'transactions', 
            'startWith': '$_idstr', 
            'connectFromField': 'amount', 
            'connectToField': 'toAccount', 
            'as': 'amountsTo', 
            'depthField': 'depthField'
          }
        }, {
          '$project': {
            '_id': 1, 
            'currency': 1, 
            'pair': 1, 
            'type': 1, 
            'userID': 1, 
            'balance': 1, 
            'crypto': 1, 
            'status': 1, 
            'accountId': '$_idstr', 
            '_effectiveDate': 1, 
            'amountsFrom': 1, 
            'amountsTo': 1, 
            'amountsToFiltered': {
              '$filter': {
                'input': '$amountsTo', 
                'as': 'amountTo', 
                'cond': {
                  '$lt': [
                    '$$amountTo.createdAt', new Date('Mon, 08 Apr 2019 00:00:00 GMT')
                  ]
                }
              }
            }, 
            'amountsFromFiltered': {
              '$filter': {
                'input': '$amountsFrom', 
                'as': 'amountFrom', 
                'cond': {
                  '$lt': [
                    '$$amountFrom.createdAt', new Date('Mon, 08 Apr 2019 00:00:00 GMT')
                  ]
                }
              }
            }
          }
        }, {
          '$project': {
            '_id': 1, 
            'currency': 1, 
            'pair': 1, 
            'type': 1, 
            'userID': 1, 
            'balance': 1, 
            'crypto': 1, 
            'status': 1, 
            'accountId': 1, 
            'effectiveDate': new Date('Mon, 08 Apr 2019 00:00:00 GMT'), 
            'totalFromFiltered': {
              '$sum': '$amountsFromFiltered.amount'
            }, 
            'totalToFiltered': {
              '$sum': '$amountsToFiltered.amount'
            }, 
            'effectiveBalance': {
              '$subtract': [
                {
                  '$sum': '$amountsToFiltered.amount'
                }, {
                  '$sum': '$amountsFromFiltered.amount'
                }
              ]
            }
          }
        }
      ]
  );
