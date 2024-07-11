type ConditionParams = {
  pointsPerGame: number;
  followers: number;
  gamesPlayed: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  averageSkillLevel: number;
  teamRole: string;
  draftRank: string;
  minutesPerGame: number;
};

type Milestone = {
  condition: (params: ConditionParams) => boolean;
  achievement: string;
};

const milestones: Milestone[] = [
  { condition: ({ pointsPerGame }) => pointsPerGame >= 10, achievement: '10 points/game' },
  { condition: ({ followers }) => followers >= 1000, achievement: '1000 followers' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 5, achievement: '5 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 5, achievement: '5 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 10, achievement: '10 rebounds/game' },
  { condition: ({ teamRole }) => teamRole === 'Starter', achievement: 'Team Starter' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 5, achievement: '5 skill average' },
  { condition: ({ followers }) => followers >= 10000, achievement: '10,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 20, achievement: '20 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 50, achievement: '50 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 15, achievement: '15 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 20, achievement: '20 rebounds/game' },
  { condition: ({ teamRole }) => teamRole === 'Captain', achievement: 'Team Captain' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 10, achievement: '10 skill average' },
  { condition: ({ followers }) => followers >= 50000, achievement: '50,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 30, achievement: '30 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 100, achievement: '100 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 20, achievement: '20 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 30, achievement: '30 rebounds/game' },
  { condition: ({ teamRole }) => teamRole === 'MVP', achievement: 'Team MVP' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 15, achievement: '15 skill average' },
  { condition: ({ followers }) => followers >= 100000, achievement: '100,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 40, achievement: '40 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 200, achievement: '200 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 25, achievement: '25 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 40, achievement: '40 rebounds/game' },
  { condition: ({ teamRole }) => teamRole === 'All-Star', achievement: 'League All-Star' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 20, achievement: '20 skill average' },
  { condition: ({ followers }) => followers >= 500000, achievement: '500,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 50, achievement: '50 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 500, achievement: '500 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 30, achievement: '30 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 50, achievement: '50 rebounds/game' },
  { condition: ({ teamRole }) => teamRole === 'League MVP', achievement: 'League MVP' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 25, achievement: '25 skill average' },
  { condition: ({ followers }) => followers >= 1000000, achievement: '1 million followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 60, achievement: '60 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 1000, achievement: '1000 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 35, achievement: '35 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 60, achievement: '60 rebounds/game' },
  { condition: ({ teamRole }) => teamRole === 'Hall of Famer', achievement: 'Hall of Famer' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 30, achievement: '30 skill average' },
  { condition: ({ followers }) => followers >= 10000000, achievement: '10 million followers' },
  { condition: ({ draftRank }) => draftRank === 'Pick #1', achievement: 'Become Number One NBA Draft Pick' },
];

export default milestones;
