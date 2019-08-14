//for collection accounts

  db.getCollection("accounts").aggregate([
    {
      '$addFields': {
        '_idstr': {
          '$toString': '$_id'
        }, 
        '_typestr': {
          '$toString': '$type'
        }
      }
    }, {
      '$group': {
        '_id': '$currency', 
        'result': {
          '$sum': 1
        }
      }
    }
  ]);
