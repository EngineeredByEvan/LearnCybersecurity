export type Lesson = { id: string; title: string; minutes: number; difficulty: 'Easy' | 'Medium' | 'Hard'; completed?: boolean };
export type Module = { id: string; title: string; lessons: Lesson[] };
export type Path = { id: string; title: string; recommended?: boolean; modules: Module[] };

export const paths: Path[] = [
  {
    id: 'foundations',
    title: 'Tier 1: Foundations',
    modules: [
      { id: 'm1-1', title: '1.1 Computing Fundamentals', lessons: [{ id: 'l-1', title: 'Data Representation', minutes: 20, difficulty: 'Easy' }] },
      {
        id: 'm1-2',
        title: '1.2 Linux Essentials',
        lessons: [
          { id: 'l-linux-1', title: 'Linux: ls Navigation', minutes: 15, difficulty: 'Easy' },
          { id: 'l-linux-2', title: 'Linux: pwd and directories', minutes: 15, difficulty: 'Easy' },
          { id: 'l-linux-3', title: 'Linux: read files with cat', minutes: 20, difficulty: 'Easy' },
          { id: 'l-linux-4', title: 'Linux: grep with pipes', minutes: 20, difficulty: 'Easy' }
        ]
      }
    ]
  },
  {
    id: 'security-foundations',
    title: 'Tier 2: Security Foundations',
    modules: [
      { id: 'm2-1', title: '2.1 Security Principles', lessons: [{ id: 'l-3', title: 'CIA Triad in Practice', minutes: 20, difficulty: 'Easy' }] }
    ]
  },
  {
    id: 'path-a-soc',
    title: 'Path A: SOC Analyst / Defensive Ops',
    recommended: true,
    modules: [{ id: 'a1', title: 'A.1 SOC Operations Overview', lessons: [{ id: 'l-4', title: 'SOC Analyst Workflow', minutes: 30, difficulty: 'Medium' }] }]
  },
  { id: 'path-b-pentest', title: 'Path B: Penetration Tester', modules: [] },
  { id: 'path-c-engineer', title: 'Path C: Security Engineer', modules: [] },
  { id: 'path-d-nvea', title: 'Path D: NVEA', modules: [] }
];
