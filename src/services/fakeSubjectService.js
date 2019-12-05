export const subjects = [
    { _id: "5b21ca3eeb7f6fbccd471813", name: "Computer Science" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Software Engineering" },
    { _id: "5b21ca3eeb7f6fbccd471812", name: "Physics" }
  ];
  
  export function getSubjects() {
    return subjects.filter(s => s);
  }
  