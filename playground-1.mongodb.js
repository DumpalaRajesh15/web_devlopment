
use("college");

db.students.insertMany([
  {
    rollNo: 101,
    name: "Rajesh",
    department: "CSE",
    marks: [
      { subject: "DBMS", score: 85 },
      { subject: "OS", score: 78 },
      { subject: "MongoDB", score: 92 }
    ]
  },
  {
    rollNo: 102,
    name: "Ravi",
    department: "CSE",
    marks: [
      { subject: "DBMS", score: 65 },
      { subject: "OS", score: 70 },
      { subject: "MongoDB", score: 75 }
    ]
  },
  {
    rollNo: 103,
    name: "Sita",
    department: "CSE",
    marks: [
      { subject: "DBMS", score: 95 },
      { subject: "OS", score: 90 },
      { subject: "MongoDB", score: 98 }
    ]
  }
]);

db.students.aggregate([
  { $unwind: "$marks" },
  {
    $group: {
      _id: "$rollNo",
      name: { $first: "$name" },
      totalMarks: { $sum: "$marks.score" },
      averageMarks: { $avg: "$marks.score" }
    }
  },
  {
    $project: {
      _id: 0,
      rollNo: "$_id",
      name: 1,
      totalMarks: 1,
      averageMarks: { $round: ["$averageMarks", 2] },
      grade: {
        $switch: {
          branches: [
            { case: { $gte: ["$averageMarks", 90] }, then: "A+" },
            { case: { $gte: ["$averageMarks", 80] }, then: "A" },
            { case: { $gte: ["$averageMarks", 70] }, then: "B" },
            { case: { $gte: ["$averageMarks", 60] }, then: "C" }
          ],
          default: "D"
        }
      }
    }
  },
  { $sort: { rollNo: 1 } }
]);
