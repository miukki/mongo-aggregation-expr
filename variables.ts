// { "ts": 1400512120100 }
db.collection.aggregate({ $project: { date: { $toDate: "$ts" } } })
// { "date": ISODate("2014-05-19T15:08:40.100Z") }
// { _id: 1, status: "a", lastModified: ISODate("2013-10-02T01:11:18.965Z") }

