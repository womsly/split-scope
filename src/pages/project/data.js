const columns = [
  {
    id: 1,
    status: "To Do",
    color: "#365ddd"
  },
  {
    id: 2,
    status: "In Progress",
    color: "#365ddd"
  },
  {
    id: 3,
    status: "In Review",
    color: "#365ddd"
  },
  {
    id: 4,
    status: "Completed",
    color: "#365ddd"
  },
  {
    id: 5,
    status: "Deployed",
    color: "#365ddd"
  },
] 

const cards = [
  {
    id: 1,
    title: 'Add authentication to the application',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
    dateDue: '01-30-2024',
    columnId: 4,
  },
  {
    id: 2,
    title: 'Fix color scheme on home page',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
    dateDue: '01-30-2024',
    columnId: 3,
  },
  {
    id: 3,
    title: 'Update database schema to fix auth bug',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
    dateDue: '01-30-2024',
    columnId: 5,
  },
  {
    id: 4,
    title: 'Remove depreciated user logic',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
    dateDue: '01-30-2024',
    columnId: 1,
  },
  {
    id: 5,
    title: 'Update UI on sign up form',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
    dateDue: '01-30-2024',
    columnId: 2,
  },
  {
    id: 6,
    title: 'Update project proposal for company meeting',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit`,
    dateDue: '01-30-2024',
    columnId: 1,
  }
]

export {
  columns,
  cards
}