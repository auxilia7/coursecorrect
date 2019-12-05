import * as subjectsAPI from "./fakeSubjectService";

const courses = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    subject: { _id: "5b21ca3eeb7f6fbccd471814", name: "Software Engineering" },
    courseNumber: 632,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "User Interface Des/Dev",
    daysOfTheWeek: "Friday",
    timeOfDayStart: "4:30pm",
    timeOfDayEnd: "7:10pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Laurel E. Fielding",
    building: "Peterson",
    buildingRoomNumber: 1105,
    description: "This course will provide a comprehensive introduction to human-computer interaction and the design and development of user interfaces, covering basic human cognition, methods for needfinding and prototyping, user-centered design, empirical and analytical methods for conducting usability evaluations, and principles for visual, information, interaction, and community design."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    subject: { _id: "5b21ca3eeb7f6fbccd471813", name: "Computer Science" },
    courseNumber: 630,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Advanced Algorithms",
    daysOfTheWeek: "Tuesday",
    timeOfDayStart: "7:20pm",
    timeOfDayEnd: "10:00pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Fei Li",
    building: "Innovation",
    buildingRoomNumber: 206,
    description: "Provides an overview of advanced algorithm design and analysis techniques. Topics include algorithms for hash tables, matrix operations, number theory, string matching, computational geometry, combinatorial optimization, and linear programming; also the areas of NP-completeness and approximation algorithms."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    subject: { _id: "5b21ca3eeb7f6fbccd471813", name: "Computer Science" },
    courseNumber: 675,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Distibuted Systems",
    daysOfTheWeek: "Wednesday",
    timeOfDayStart: "4:30pm",
    timeOfDayEnd: "7:10pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Yue Cheng",
    building: "Innovation",
    buildingRoomNumber: 134,
    description: "Issues in design and implementation of distributed systems and applications. Topics include distributed communication paradigms, middleware, coordination and synchronization, distributed transactions, consistency and replication, fault-tolerance and reliability, and peer-to-peer systems."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    subject: { _id: "5b21ca3eeb7f6fbccd471813", name: "Computer Science" },
    courseNumber: 682,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Computer Vision",
    daysOfTheWeek: "Friday",
    timeOfDayStart: "1:30pm",
    timeOfDayEnd: "4:10pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Zoran Duric",
    building: "Arts and Design",
    buildingRoomNumber: 8,
    description: "Study of computational models of visual perception and their implementation in computer systems. Topics include early visual processing, edge detection, segmentation, intrinsic images, image modeling, representation of visual knowledge, and image understanding."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    subject: { _id: "5b21ca3eeb7f6fbccd471814", name: "Software Engineering" },
    courseNumber: 622,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Dist Software Eng",
    daysOfTheWeek: "Monday",
    timeOfDayStart: "7:20pm",
    timeOfDayEnd: "10:00pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "David A. Wheeler",
    building: "Arts and Design",
    buildingRoomNumber: 2026,
    description: "Hands-on introduction to techniques and programming interfaces for distributed software engineering. Networking protocols at several layers. Construction of distributed and concurrent software using network protocol services. Applications of Internet and web-based software."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    subject: { _id: "5b21ca3eeb7f6fbccd471814", name: "Software Engineering" },
    courseNumber: 625,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Software Proj Mgmt",
    daysOfTheWeek: "Monday",
    timeOfDayStart: "7:20pm",
    timeOfDayEnd: "10:00pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Kenneth E Nidiffer",
    building: "Innovation",
    buildingRoomNumber: 206,
    description: "Lifecycle and process models; process metrics; planning for a software project; mechanisms for monitoring and controlling schedule, budget, quality, and productivity; and leadership, motivation, and team building."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    subject: { _id: "5b21ca3eeb7f6fbccd471812", name: "Physics" },
    courseNumber: 502,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Intro Quantum Mech",
    daysOfTheWeek: "Monday",
    timeOfDayStart: "7:20pm",
    timeOfDayEnd: "10:00pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Mingzhen Tian",
    building: "Planetary",
    buildingRoomNumber: 220,
    description: "Experimental basis of quantum mechanics, the wave function, and systems in one, two, and three dimensions."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471822",
    subject: { _id: "5b21ca3eeb7f6fbccd471812", name: "Physics" },
    courseNumber: 512,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Solid State Physics",
    daysOfTheWeek: "Friday",
    timeOfDayStart: "10:30am",
    timeOfDayEnd: "1:10pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Yuri Mishin",
    building: "Planetary",
    buildingRoomNumber: 112,
    description: "Crystal structures, binding, lattice vibrations, the free electron model, metals, semiconductors and semiconductor devices, superconductivity, and magnetism."
  },
  {
    _id: "5b21ca3eeb7f6fbccd471823",
    subject: { _id: "5b21ca3eeb7f6fbccd471812", name: "Physics" },
    courseNumber: 575,
    section: 1,
    campus: "Fairfax",
    numberOfCredits: 3,
    courseTitle: "Atmospheric Physics I",
    daysOfTheWeek: "Friday",
    timeOfDayStart: "7:20pm",
    timeOfDayEnd: "10:00pm",
    dateBegin: "1/21",
    dateEnd: "5/13",
    capacity: 44,
    instructor: "Michael E Summers",
    building: "Exploratory",
    buildingRoomNumber: 1004,
    description: "Introduction to basic physical and chemical processes that operate in the Earth's atmosphere. Emphasis on those concepts that provide a global description of the current atmospheric state and those processes that relate to global change and atmospheric evolution. Topics include equilibrium structure, radiative transfer models, thermodynamics of various atmospheric layers, and the various processes defining these layers."
  }
];

export function getCourses() {
  return courses;
}

export function getCourse(id) {
  return courses.find(c => c._id === id);
}

export function saveCourse(course) {
  let courseInDb = courses.find(c => c._id === course._id);
  courseInDb.courseTitle = course.courseTitle;
  courseInDb.subject = subjectsAPI.subjects.find(g => g._id === course.subjectId);
  courseInDb.subject = course.subject;
  courseInDb.courseNumber = course.courseNumber;

  if (!courseInDb._id) {
    courseInDb._id = Date.now();
    courses.push(courseInDb);
  }

  return courseInDb;
}

export function deleteCourse(id) {
  let courseInDb = courses.find(m => m._id === id);
  courses.splice(courses.indexOf(courseInDb), 1);
  return courseInDb;
}
