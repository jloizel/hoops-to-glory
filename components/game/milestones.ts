type ConditionParams = {
  pointsPerGame: number;
  followers: number;
  gamesPlayed: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  averageSkillLevel: number;
  teamRole: string;
  draftRank: string | number;
  minutesPerGame: number;
};

type Milestone = {
  condition: (params: ConditionParams) => boolean;
  achievement: string;
};

const milestones: Milestone[] = [
  { condition: ({ pointsPerGame }) => pointsPerGame >= 5, achievement: '5 points/game' },
  { condition: ({ followers }) => followers >= 500, achievement: '500 followers' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 5, achievement: '5 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 2, achievement: '2 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 4, achievement: '4 rebounds/game' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 5, achievement: '5 skill average' },
  { condition: ({ teamRole }) => teamRole === 'Role Player', achievement: 'Role Player' },
  { condition: ({ followers }) => followers >= 1000, achievement: '1000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 10, achievement: '10 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 55, achievement: '15 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 6, achievement: '6 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 7, achievement: '7 rebounds/game' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 10, achievement: '10 skill average' },
  { condition: ({ teamRole }) => teamRole === 'Starter', achievement: 'Starter' },
  { condition: ({ followers }) => followers >= 10000, achievement: '10,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 15, achievement: '15 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 50, achievement: '50 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 10, achievement: '10 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 10, achievement: '10 rebounds/game' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 20, achievement: '20 skill average' },
  { condition: ({ draftRank }) => draftRank === 'Late Second Round Pick', achievement: 'Second Round Pick' },
  { condition: ({ followers }) => followers >= 50000, achievement: '50,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 20, achievement: '20 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 100, achievement: '100 games played' },
  { condition: ({ teamRole }) => teamRole === 'Star Player', achievement: 'Star Player' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 15, achievement: '15 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 15, achievement: '15 rebounds/game' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 40, achievement: '40 skill average' },
  { condition: ({ draftRank }) => draftRank === 'Late First Round Pick', achievement: 'First Round Pick' },  
  { condition: ({ followers }) => followers >= 500000, achievement: '500,000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 25, achievement: '25 points/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 200, achievement: '200 games played' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 20, achievement: '20 rebounds/game' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 60, achievement: '60 skill average' },
  { condition: ({ draftRank }) => typeof draftRank === 'number' && draftRank <= 10, achievement: 'Top 10 Pick' },
  { condition: ({ followers }) => followers >= 1000000, achievement: '1 million followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 30, achievement: '30 points/game' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 80, achievement: '80 skill average' },
  { condition: ({ averageSkillLevel }) => averageSkillLevel >= 100, achievement: '100 skill average' },
  { condition: ({ draftRank }) => draftRank === 'Pick #1', achievement: 'Become Number One NBA Draft Pick' },
];

export default milestones;
