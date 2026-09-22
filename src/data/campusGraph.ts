export interface CampusNode {
  id: string
  name: string
  type: string
  x: number
  y: number
  coordinates: [number, number]
  description: string
}

export interface CampusEdge {
  id: string
  from: string
  to: string
  weight: number
}

export interface Graph {
  nodes: CampusNode[]
  edges: CampusEdge[]
}

export const campusNodes: CampusNode[] = [
  {
    id: 'main-gate',
    name: 'Main Gate',
    type: 'Entry Point',
    x: 90,
    y: 240,
    coordinates: [90, 240],
    description: 'Primary access point and campus arrival hub.'
  },
  {
    id: 'administration',
    name: 'Administration Block',
    type: 'Administrative',
    x: 210,
    y: 110,
    coordinates: [210, 110],
    description: 'Academic administration and student services office.'
  },
  {
    id: 'academic',
    name: 'Academic Block',
    type: 'Academic',
    x: 360,
    y: 120,
    coordinates: [360, 120],
    description: 'Lecture halls and classrooms for core courses.'
  },
  {
    id: 'library',
    name: 'Central Library',
    type: 'Learning Hub',
    x: 520,
    y: 130,
    coordinates: [520, 130],
    description: 'Study resources, reading rooms, and digital archives.'
  },
  {
    id: 'cs-block',
    name: 'Computer Science Block',
    type: 'Academic',
    x: 660,
    y: 200,
    coordinates: [660, 200],
    description: 'Department hub for computing labs and research.'
  },
  {
    id: 'engineering',
    name: 'Engineering Block',
    type: 'Academic',
    x: 250,
    y: 270,
    coordinates: [250, 270],
    description: 'Core engineering workshops and design labs.'
  },
  {
    id: 'innovation',
    name: 'Innovation Center',
    type: 'Research',
    x: 460,
    y: 290,
    coordinates: [460, 290],
    description: 'Startup incubator and collaborative research workspace.'
  },
  {
    id: 'student-center',
    name: 'Student Center',
    type: 'Campus Life',
    x: 610,
    y: 330,
    coordinates: [610, 330],
    description: 'Student events, clubs, and common engagement spaces.'
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    type: 'Event Hall',
    x: 760,
    y: 320,
    coordinates: [760, 320],
    description: 'Large venue for lectures, seminars, and ceremonies.'
  },
  {
    id: 'hostel',
    name: 'Hostel Block',
    type: 'Residential',
    x: 110,
    y: 410,
    coordinates: [110, 410],
    description: 'Accommodation block for on-campus residents.'
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    type: 'Recreation',
    x: 330,
    y: 430,
    coordinates: [330, 430],
    description: 'Athletics facilities and outdoor sports grounds.'
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    type: 'Dining',
    x: 510,
    y: 430,
    coordinates: [510, 430],
    description: 'Dining hall serving meals and refreshments.'
  },
  {
    id: 'research',
    name: 'Research Center',
    type: 'Research',
    x: 700,
    y: 430,
    coordinates: [700, 430],
    description: 'Applied research facilities and advanced labs.'
  },
  {
    id: 'parking',
    name: 'Parking Area',
    type: 'Transport',
    x: 810,
    y: 150,
    coordinates: [810, 150],
    description: 'Staff and visitor parking lot adjacent to the main drive.'
  }
]

export const campusEdges: CampusEdge[] = [
  { id: 'main-gate-administration', from: 'main-gate', to: 'administration', weight: 7 },
  { id: 'main-gate-hostel', from: 'main-gate', to: 'hostel', weight: 9 },
  { id: 'main-gate-engineering', from: 'main-gate', to: 'engineering', weight: 10 },
  { id: 'main-gate-parking', from: 'main-gate', to: 'parking', weight: 12 },
  { id: 'administration-academic', from: 'administration', to: 'academic', weight: 6 },
  { id: 'administration-engineering', from: 'administration', to: 'engineering', weight: 8 },
  { id: 'academic-library', from: 'academic', to: 'library', weight: 5 },
  { id: 'academic-cs-block', from: 'academic', to: 'cs-block', weight: 9 },
  { id: 'academic-innovation', from: 'academic', to: 'innovation', weight: 11 },
  { id: 'library-cs-block', from: 'library', to: 'cs-block', weight: 7 },
  { id: 'library-parking', from: 'library', to: 'parking', weight: 8 },
  { id: 'cs-block-student-center', from: 'cs-block', to: 'student-center', weight: 6 },
  { id: 'cs-block-auditorium', from: 'cs-block', to: 'auditorium', weight: 9 },
  { id: 'cs-block-research', from: 'cs-block', to: 'research', weight: 11 },
  { id: 'engineering-innovation', from: 'engineering', to: 'innovation', weight: 7 },
  { id: 'engineering-sports', from: 'engineering', to: 'sports', weight: 8 },
  { id: 'engineering-hostel', from: 'engineering', to: 'hostel', weight: 9 },
  { id: 'innovation-student-center', from: 'innovation', to: 'student-center', weight: 8 },
  { id: 'innovation-cafeteria', from: 'innovation', to: 'cafeteria', weight: 6 },
  { id: 'student-center-auditorium', from: 'student-center', to: 'auditorium', weight: 7 },
  { id: 'student-center-cafeteria', from: 'student-center', to: 'cafeteria', weight: 5 },
  { id: 'student-center-research', from: 'student-center', to: 'research', weight: 9 },
  { id: 'auditorium-research', from: 'auditorium', to: 'research', weight: 10 },
  { id: 'hostel-sports', from: 'hostel', to: 'sports', weight: 6 },
  { id: 'hostel-cafeteria', from: 'hostel', to: 'cafeteria', weight: 11 },
  { id: 'sports-cafeteria', from: 'sports', to: 'cafeteria', weight: 7 },
  { id: 'cafeteria-research', from: 'cafeteria', to: 'research', weight: 8 }
]

export const campusGraph: Graph = {
  nodes: campusNodes,
  edges: campusEdges
}

export const campusNodeMap = new Map(campusNodes.map((node) => [node.id, node]))
