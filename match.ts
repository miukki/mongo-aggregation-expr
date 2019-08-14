  db.getCollection("accounts").aggregate([
    {
      '$addFields': {
        '_idstr': {
          '$toString': '$_id'
        }, 
        '_type': {
          '$toString': '$type'
        }
      }
    }, {
      '$match': {
        '$or': [
          {
            'currency': 'ETH'
          }, {
            'currency': 'BTC'
          }
        ]
      }
    }, {
      '$group': {
        '_id': null, 
        'result': {
          '$sum': 1
        }
      }
    }
  ]);