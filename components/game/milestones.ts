type ConditionParams = {
  triggerIntroMsg1: boolean;
  triggerIntroMsg2: boolean;
  triggerIntroMsg3: boolean;
  triggerIntroMsg4: boolean;
  triggerIntroMsg5: boolean;
  showRecovery: boolean;
  showGames: boolean;
  showEndorsements: boolean;
  pointsPerGame: number;
  followers: number;
  gamesPlayed: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  averageSkillLevel: number;
  teamRole: string;
  draftRank: string | number;
  minutesPerGame: number;
  pickNumber: number | null
};

type Milestone = {
  condition: (params: ConditionParams) => boolean;
  achievement: string;
};

const milestones: Milestone[] = [
  { condition: ({ triggerIntroMsg1 }) => triggerIntroMsg1, achievement: 'introMsg1' },
  { condition: ({ triggerIntroMsg2 }) => triggerIntroMsg2, achievement: 'introMsg2' },
  { condition: ({ triggerIntroMsg3 }) => triggerIntroMsg3, achievement: 'introMsg3' },
  { condition: ({ triggerIntroMsg4 }) => triggerIntroMsg4, achievement: 'introMsg4' },
  { condition: ({ triggerIntroMsg5 }) => triggerIntroMsg5, achievement: 'introMsg5' },
  { condition: ({ showRecovery }) => showRecovery, achievement: 'showRecovery' },
  { condition: ({ showGames }) => showGames, achievement: 'showGames' },
  { condition: ({ showEndorsements }) => showEndorsements, achievement: 'showEndorsements' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 5, achievement: '5 games played' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 5, achievement: '5 points/game' },
  { condition: ({ followers }) => followers >= 500, achievement: '500 followers' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 5, achievement: '5 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 5, achievement: '5 rebounds/game' },
  { condition: ({ minutesPerGame }) => minutesPerGame >= 5, achievement: '5 minutes/game' },
  { condition: ({ followers }) => followers >= 1000, achievement: '1000 followers' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 10, achievement: '10 points/game' },
  { condition: ({ teamRole }) => teamRole === 'Role Player', achievement: 'Role Player' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 15, achievement: '15 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 10, achievement: '10 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 10, achievement: '10 rebounds/game' },
  { condition: ({ minutesPerGame }) => minutesPerGame >= 10, achievement: '10 minutes/game' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 18, achievement: '18 points/game' },
  { condition: ({ minutesPerGame }) => minutesPerGame >= 16, achievement: '16 minutes/game' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 30, achievement: '30 games played' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 15, achievement: '15 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 15, achievement: '15 rebounds/game' },
  { condition: ({ minutesPerGame }) => minutesPerGame >= 22, achievement: '22 minutes/game' },
  { condition: ({ teamRole }) => teamRole === 'Sixth Man', achievement: 'Sixth Man' },
  { condition: ({ followers }) => followers >= 10000, achievement: '10,000 followers' },
  { condition: ({ draftRank }) => draftRank === 'Second Round Pick', achievement: 'Second Round Pick' },
  { condition: ({ gamesPlayed }) => gamesPlayed >= 50, achievement: '50 games played' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 25, achievement: '25 points/game' },
  { condition: ({ followers }) => followers >= 25000, achievement: '25,000 followers' },
  { condition: ({ teamRole }) => teamRole === 'Starter', achievement: 'Starter' },
  { condition: ({ draftRank }) => draftRank === 'First Round Pick', achievement: 'First Round Pick' },  
  { condition: ({ pointsPerGame }) => pointsPerGame >= 35, achievement: '35 points/game' },
  { condition: ({ minutesPerGame }) => minutesPerGame >= 34, achievement: '34 minutes/game' },
  { condition: ({ teamRole }) => teamRole === 'Star Player', achievement: 'Star Player' },
  { condition: ({ followers }) => followers >= 50000, achievement: '50,000 followers' },
  { condition: ({ pickNumber }) => pickNumber !== null && pickNumber <= 10, achievement: 'Top 10 Pick' },
  { condition: ({ assistsPerGame }) => assistsPerGame >= 25, achievement: '25 assists/game' },
  { condition: ({ reboundsPerGame }) => reboundsPerGame >= 20, achievement: '20 rebounds/game' },
  { condition: ({ pointsPerGame }) => pointsPerGame >= 40, achievement: '40 points/game' },
  { condition: ({ followers }) => followers >= 100000, achievement: '100,000 followers' },
  { condition: ({ draftRank }) => draftRank === 'Pick #1', achievement: 'Become Number One NBA Draft Pick' },
];

export default milestones;
